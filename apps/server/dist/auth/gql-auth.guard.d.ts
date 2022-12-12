import { ExecutionContext, CanActivate } from '@nestjs/common';
import { AuthService } from './auth.service';
export declare class GqlAuthGuard implements CanActivate {
    private authService;
    constructor(authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
//# sourceMappingURL=gql-auth.guard.d.ts.map