import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { ContactQuestionProcessor } from './contact-question.processor';

@Module({
  imports: [EmailModule],
  providers: [ContactQuestionProcessor],
})
export class ContactQuestionModule {}
