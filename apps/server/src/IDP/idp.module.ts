import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/mail/mail.module';
import { IDPService } from './idp.service';

@Module({
  imports: [MailModule],
  controllers: [],
  providers: [IDPService],
  exports: [IDPService],
})
export class IDPModule {}
