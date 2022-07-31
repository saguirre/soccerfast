import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { ActivateAccountProcessor } from './activate-account.processor';

@Module({ imports: [EmailModule], providers: [ActivateAccountProcessor] })
export class ActivateAccountModule {}
