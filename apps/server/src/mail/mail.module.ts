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
                    user: 'apikey',
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
export class MailModule { }
