import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/getCurrentUser.decorator';
import { AuthService } from 'src/modules/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@User() user) {
    return this.authService.login(user);
  }
}
