import { NestMiddleware } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response, NextFunction } from 'express';
export declare class PreauthMiddleware implements NestMiddleware {
    private authService;
    constructor(authService: AuthService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=preAuth.middleware.d.ts.map