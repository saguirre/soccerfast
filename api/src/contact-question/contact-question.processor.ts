import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { EmailService } from 'src/email/email.service';

@Processor('contact-question')
export class ContactQuestionProcessor {
  private readonly logger = new Logger(ContactQuestionProcessor.name);

  constructor(private readonly emailService: EmailService) {}

  @Process('contact-question')
  async handleContactQuestionEmailSend(job: Job) {
    this.logger.debug('Start sending contact question email...');
    this.logger.debug(job.data);
    const model = {
      name: job.data.name,
      lastName: job.data.lastName,
      subject: job.data.subject,
      phone: job.data?.phone,
      message: job.data.message,
      email: job.data.email,
    };
    await this.emailService.sendContactQuestionEmail(model, job.data.locale);
    this.logger.debug('Email sending completed!');
  }
}
