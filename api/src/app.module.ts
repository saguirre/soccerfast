import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { TeamsModule } from './teams/teams.module';
import { RulesModule } from './rules/rules.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [UsersModule, TournamentsModule, TeamsModule, RulesModule, ContactModule, AuthModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
