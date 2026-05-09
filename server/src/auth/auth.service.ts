/* eslint-disable @typescript-eslint/no-unsafe-call */
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/client';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async register(userData: Prisma.UserCreateInput) {
    const existing = await this.userService.findUserByEmail(userData.email);
    if (existing) {
      throw new ConflictException('Email already in use');
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltOrRounds);

    const newUser = {
      ...userData,
      password: hashedPassword,
    };

    return this.userService.createUser(newUser);
  }

  async login(userData: LoginDto) {
    const user = await this.userService.findUserByEmail(userData.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(
      userData.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }
    const payload: { sub: string; email: string; role: string } = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const token = await this.jwtService.signAsync(payload);

    return { user, token };
  }

  async verifyToken(token: string) {
    try {
      const tokenWithoutBearer = token.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(tokenWithoutBearer);
      return decodedToken;
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }

  async verifySession(token: string) {
    try {
      const tokenWithoutBearer = token.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(tokenWithoutBearer);
      const user = await this.userService.findUserByEmail(decodedToken.email);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const { password: _, ...safeUser } = user;
      return { user: safeUser, token };

    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }
}
