import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() userData: RegisterDto) {
    return this.authService.register(userData);
  }
  @Post('login')
  async login(@Body() userData: LoginDto) {
    return this.authService.login(userData);
  }
  @Get('verify-token')
  @UseGuards(JwtAuthGuard)
  async verifyToken(@Req() req: Request) {
    const authHeader = req.headers['authorization'];
    return this.authService.verifyToken(authHeader);
  }
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async verifySession(@Req() req: Request) {
    const authHeader = req.headers['authorization'];
    return this.authService.verifySession(authHeader);
  }
}
