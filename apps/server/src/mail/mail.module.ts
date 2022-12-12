import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'api',
          pass: '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',
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
