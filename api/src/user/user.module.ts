import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FileModule } from 'src/file/file.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EmailModule } from 'src/email/email.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    FileModule,
    EmailModule,
    BullModule.registerQueue({
      name: 'activate-account',
    }),
    JwtModule,
  ],
  providers: [UserService, PrismaService, JwtService],
  controllers: [UserController],
  exports: [UserService, BullModule],
})
export class UserModule {}
