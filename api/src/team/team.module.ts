import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  controllers: [TeamController],
  providers: [TeamService, PrismaService]
})
export class TeamModule {}
