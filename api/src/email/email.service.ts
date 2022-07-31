import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ForgotPasswordEmail } from 'src/dtos/email';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmation(name: string, email: string, url: string) {
    try {
      this.mailerService.sendMail({
        from: 'saguirrews@gmail.com',
        to: email,
        subject: 'Confirm Your Email - SoccerFast',
        template: './en-confirm-email',
        context: {
          name,
          url,
        },
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  async sendForgotPassword(model: ForgotPasswordEmail, locale: string = 'es') {
    try {
      this.mailerService.sendMail({
        from: 'saguirrews@gmail.com',
        to: model.email,
        subject: 'Recover Password - SoccerFast',
        template: `./${locale}-forgot-password`,
        context: {
          name: model.name,
          url: model.url,
        },
      });
    } catch (error) {
      Logger.error(error);
    }
  }
}
