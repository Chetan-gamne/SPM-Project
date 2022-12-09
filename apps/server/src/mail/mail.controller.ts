import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('mail')
export class MailController {
    constructor(private mailService: MailerService) {}

    @Post('html-email')
    async postHTMLEmail(@Body() payload:any) {
        var response = await this.mailService.sendMail({
            to: 'rohanmalve00@gmail.com',
            from: 'spmprojectdemo@gmail.com',
            subject: 'SPM Floor Order',
            template: 'superhero',
            context: {
                superHero: payload
            },
        });
        return 'success';
    }
}