import { Module } from '@nestjs/common';
import { ContactInfoService } from './contact.service';
import { ContactInfoController } from './contact.controller';
import { PrismaService } from '../prisma.service';
import { EmailModule } from 'src/email/email.module';
import { BullModule } from '@nestjs/bull';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'contact-question',
    }),
  ],
  providers: [ContactInfoService, PrismaService, EmailService],
  controllers: [ContactInfoController],
})
export class ContactModule {}
