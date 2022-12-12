import { Request, Response } from 'express';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(request: Request, response: Response): void;
}
//# sourceMappingURL=app.controller.d.ts.map