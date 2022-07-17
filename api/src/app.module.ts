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

@Module({
  imports: [
    UserModule,
    TournamentModule,
    TeamModule,
    RuleModule,
    ContactModule,
    AuthModule,
    NotificationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
