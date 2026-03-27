import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '../../generated/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly userSerivce: UsersService) {}

  @Post()
  async createUser(@Body() userData: Prisma.UserCreateInput) {
    const user = await this.userSerivce.createUser(userData);
    return user;
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getMe(
    @Request() req: { user: { userId: string; email: string; name: string } },
  ) {
    return req.user;
  }
}
