import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: RegisterDto) {
    return this.authService.register(userData);
  }
  @Post('login')
  async login(@Body() userData: LoginDto) {
    return this.authService.login(userData);
  }
}
