import { Module } from "@nestjs/common";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailerModule } from "@nestjs-modules/mailer";
import { join } from "path";
import { MailController } from "./mail.controller";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.sendgrid.net",
        auth: {
          user: "apikey",
          pass: process.env.mail_api_key,
        },
        // service: "SendGrid",
        // api_key: process.env.mail_api_key,
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: join("src", "Mails"),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [MailController],
})
export class MailModule {
  constructor() {
    // console.log(process.env.mail_api_key);
  }
}
