import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { UserModule } from 'src/modules/user/user.module';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'some-secret-key',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
