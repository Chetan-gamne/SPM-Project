import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
export declare class PreAuthMiddleware implements NestMiddleware {
    private defaultApp;
    constructor();
    use(req: Request, res: Response, next: Function): void;
    private accessDenied;
}
//# sourceMappingURL=preauth.middleware.d.ts.map