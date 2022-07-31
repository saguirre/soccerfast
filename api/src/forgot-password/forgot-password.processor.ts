import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { EmailService } from 'src/email/email.service';

@Processor('forgot-password')
export class ForgotPasswordProcessor {
  private readonly logger = new Logger(ForgotPasswordProcessor.name);

  constructor(private readonly emailService: EmailService) {}

  @Process('forgot-password')
  async handleTranscode(job: Job) {
    this.logger.debug('Start sending forgot password email...');
    this.logger.debug(job.data);
    await this.emailService.sendForgotPassword(
      job.data.name,
      job.data.email,
      job.data.url,
    );
    this.logger.debug('Email sending completed!');
  }
}
