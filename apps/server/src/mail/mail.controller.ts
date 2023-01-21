import { Body, Controller, Post } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Controller("mail")
export class MailController {
  constructor(private mailService: MailerService) {}

  @Post("html-email")
  async postHTMLEmail(@Body() payload: any) {
    const response = await this.mailService.sendMail({
      to: "prathameshmoharkar225@gmail.com",
      from: "chetangamne12@gmail.com",
      subject: "SPM Floor Order",
      template: "superhero",
      context: {
        superHero: payload,
      },
    });
    return "success";
  }
}
