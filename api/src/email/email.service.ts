import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import {
  ActivateAccountModel,
  ContactQuestionEmail,
  ForgotPasswordEmail,
} from 'src/dtos/email';

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

  async sendContactQuestionEmail(
    model: ContactQuestionEmail,
    locale: string = 'es',
  ) {
    try {
      this.mailerService.sendMail({
        from: 'saguirrews@gmail.com',
        to: 'saguirrews@gmail.com',
        subject: 'Contact Question',
        template: `./${locale}-contact-question`,
        context: {
          name: model.name,
          lastName: model.lastName,
          email: model.email,
          subject: model.subject,
          message: model.message,
          phone: model.phone,
        },
      });
    } catch (error) {
      Logger.error(error);
    }
  }
}
