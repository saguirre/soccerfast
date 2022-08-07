import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TournamentModule } from './tournament/tournament.module';
import { TeamModule } from './team/team.module';
import { RuleModule } from './rule/rule.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { NotificationModule } from './notification/notification.module';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';
import { FileModule } from './file/file.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { ActivateAccountModule } from './activate-account/activate-account.module';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from './email/email.module';
import { ContactQuestionModule } from './contact-question/contact-question.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'forgot-password',
    }),
    UserModule,
    TournamentModule,
    TeamModule,
    RuleModule,
    ContactModule,
    AuthModule,
    NotificationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    FileModule,
    ForgotPasswordModule,
    ActivateAccountModule,
    EmailModule,
    ContactQuestionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
