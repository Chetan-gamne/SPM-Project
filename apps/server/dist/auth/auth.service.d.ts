import { Database } from 'arangojs';
import { DocumentCollection } from 'arangojs/collection';
import { BaseService } from 'src/database/base.service';
import { IDPService } from 'src/IDP/idp.service';
import { CreateUserDto } from './dto/createUser.dto';
export declare class AuthService extends BaseService {
    private readonly db;
    private IDPService;
    constructor(db: Database, IDPService: IDPService);
    collection: DocumentCollection;
    signup(user: CreateUserDto): Promise<{
        msg: string;
    }>;
    verifyByToken(token: any): Promise<any>;
    updatePassowrd(uid: any, data: any): Promise<{
        msg: string;
    }>;
    forgotPassword(email: string): Promise<any>;
    meData(userId: string): Promise<any>;
}
//# sourceMappingURL=auth.service.d.ts.map