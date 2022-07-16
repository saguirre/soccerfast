import { Module } from '@nestjs/common';
import { ContactInfoService } from './contact.service';
import { ContactInfoController } from './contact.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ContactInfoService, PrismaService],
  controllers: [ContactInfoController],
})
export class ContactModule {}
