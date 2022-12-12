import { MailerService } from '@nestjs-modules/mailer';
export declare class IDPService {
    private mailService;
    private defaultApp;
    constructor(mailService: MailerService);
    verify(token: any): Promise<any>;
    private accessDenied;
    createUser(data: any): Promise<any>;
    resetPassword(uid: any, data: any): Promise<any>;
    forgotPassword(email: string): Promise<any>;
}
//# sourceMappingURL=idp.service.d.ts.map