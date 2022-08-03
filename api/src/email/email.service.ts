import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ActivateAccountModel, ForgotPasswordEmail } from 'src/dtos/email';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendAccountActivation(
    model: ActivateAccountModel,
    locale: string = 'es',
  ) {
    try {
      this.mailerService.sendMail({
        from: 'saguirrews@gmail.com',
        to: model.email,
        subject: 'Confirm Your Email - SoccerFast',
        template: `./${locale}-confirm-email`,
        context: {
          name: model.name,
          url: model.url,
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
