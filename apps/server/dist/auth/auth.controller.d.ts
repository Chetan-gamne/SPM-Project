import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    addUser(user: CreateUserDto): Promise<{
        msg: string;
    }>;
    getUser(): string;
}
//# sourceMappingURL=auth.controller.d.ts.map