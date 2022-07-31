import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

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
  async sendForgotPassword(name: string, email: string, url: string) {
    try {
      this.mailerService.sendMail({
        from: 'saguirrews@gmail.com',
        to: email,
        subject: 'Recover Password - SoccerFast',
        template: './en-forgot-password',
        context: {
          name,
          url,
        },
      });
    } catch (error) {
      Logger.error(error);
    }
  }
}
