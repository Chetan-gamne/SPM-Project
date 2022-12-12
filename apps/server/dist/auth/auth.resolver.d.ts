import { AuthService } from './auth.service';
import { CreateUserInput } from './dto/createUser.input';
export declare class AuthResolver {
    private AuthService;
    constructor(AuthService: AuthService);
    register(args: CreateUserInput): Promise<{
        msg: string;
    }>;
    verify(user: any): any;
    forgotPassword(email: string): Promise<any>;
    resetPassword(newPassword: string, user: any): Promise<{
        msg: string;
    }>;
    me(user: any): Promise<any>;
}
//# sourceMappingURL=auth.resolver.d.ts.map