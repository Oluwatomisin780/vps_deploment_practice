import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/modules/user/user.type';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findUser(email);
    if (!user) throw new NotFoundException('User not found');
    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (!passwordMatch) throw new BadRequestException('Invalid credentials');
    console.log('Password match:', passwordMatch);

    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
