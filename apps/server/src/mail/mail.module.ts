import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { constants } from 'src/server.constants';
import { MailController } from './mail.controller';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: constants.mail.MAIL_HOST,
        auth: {
          user: constants.mail.MAIL_USER_KEY,
          pass: constants.mail.MAIL_USER_PASSWORD,
        },
      },
      template: {
        dir: join('src', 'Mails'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class MailModule {}
