import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
          user: 'saguirrews@gmail.com',
          pass: 'kvxyvqvudrnnznba',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@gmail.com>',
      },
      template: {
        dir: join(__dirname, 'email/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
