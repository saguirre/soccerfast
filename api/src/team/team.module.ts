import { Module } from '@nestjs/common';
import { FileModule } from 'src/file/file.module';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from '../prisma.service';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  imports: [FileModule, UserModule],
  controllers: [TeamController],
  providers: [TeamService, PrismaService],
})
export class TeamModule {}
