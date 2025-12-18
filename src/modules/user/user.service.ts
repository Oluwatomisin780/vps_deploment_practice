import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/modules/user/user.type';
import { PrismaService } from 'src/services/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(data: CreateUserDto) {
    data.password = await bcrypt.hash(data.password, 12);
    return this.prismaService.user.create({ data });
  }

  async findUser(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  updateUser(data: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { email: data.email },
      data,
    });
  }

  deleteUser(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
