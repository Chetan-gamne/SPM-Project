import { Module } from "@nestjs/common";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailerModule } from "@nestjs-modules/mailer";
import { join } from "path";
import { MailController } from "./mail.controller";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.mailgun.org",
        auth: {
          user: process.env.MAILGUN_USER_KEY,
          pass: process.env.MAILGUN_PASS_KEY,
        },
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
export class MailModule { }
