import { Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async createUser(data: Prisma.UserCreateInput) {
    const {password:_,...safeUser} =await this.prisma.user.create({ data });
    return safeUser;
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }
}
