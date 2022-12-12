import { MailerService } from '@nestjs-modules/mailer';
export declare class MailController {
    private mailService;
    constructor(mailService: MailerService);
    postHTMLEmail(payload: any): Promise<string>;
}
//# sourceMappingURL=mail.controller.d.ts.map