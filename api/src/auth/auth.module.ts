import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { PrismaService } from '../prisma.service';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    {
      ...JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60s' },
      }),
      global: true,
    },
  ],
  providers: [
    AuthService,
    LocalStrategy,
    PrismaService,
    JwtService,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
