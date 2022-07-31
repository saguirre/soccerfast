import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { EmailService } from 'src/email/email.service';

@Processor('activate-account')
export class ActivateAccountProcessor {
  private readonly logger = new Logger(ActivateAccountProcessor.name);

  constructor(private readonly emailService: EmailService) {}

  @Process('activate-account')
  async sendActivateAccountEmail(job: Job) {
    this.logger.debug('Start sending account activation email...');
    this.logger.debug(job.data);
    const model = {
      name: job.data.name,
      email: job.data.email,
      url: job.data.url,
    };
    await this.emailService.sendAccountActivation(model, job.data.locale);
    this.logger.debug('Email sending completed!');
  }
}
