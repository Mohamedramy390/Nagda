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
    await this.prisma.user.create({ data });
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }
}
