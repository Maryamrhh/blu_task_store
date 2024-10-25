import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../../application/services/auth.service';
import { RegisterDto } from '../dtos/register.dto';
import { RegisterCommand } from '../../application/commands/register.command';
import { LoginCommand } from '../../application/commands/login.command';
import { LoginDto } from '../dtos/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  async register(@Body() registerDto: RegisterDto) {
    const command = new RegisterCommand(
      registerDto.email,
      registerDto.password,
      registerDto.role,
    );
    return this.authService.register(command);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  async login(@Body() loginDto: LoginDto) {
    const command = new LoginCommand(loginDto.email, loginDto.password);
    return this.authService.login(command);
  }
}
