import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { ForgotPasswordProcessor } from './forgot-password.processor';

@Module({
  imports: [EmailModule],
  providers: [ForgotPasswordProcessor],
})
export class ForgotPasswordModule {}
