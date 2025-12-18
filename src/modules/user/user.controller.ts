import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { CreateUserDto } from 'src/modules/user/user.type';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create-user')
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }
}
