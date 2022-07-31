import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { EmailService } from 'src/email/email.service';

@Processor('forgot-password')
export class ForgotPasswordProcessor {
  private readonly logger = new Logger(ForgotPasswordProcessor.name);

  constructor(private readonly emailService: EmailService) {}

  @Process('forgot-password')
  async handleTranscode(job: Job) {
    this.logger.debug('Start sending forgot password email...');
    this.logger.debug(job.data);
    const model = {
      name: job.data.name,
      email: job.data.email,
      url: job.data.url,
    };
    await this.emailService.sendForgotPassword(model, job.data.locale);
    this.logger.debug('Email sending completed!');
  }
}
