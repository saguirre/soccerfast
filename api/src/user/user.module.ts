import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [FileModule],
  providers: [UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
