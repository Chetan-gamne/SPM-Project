export declare class CreateUserInput {
    email: string;
    name: string;
    password: string;
}
export declare class Book {
    id: number;
    title: string;
    price: number;
}
export declare class RegisterDTO {
    msg: string;
}
export declare class UserDto {
    _id: string;
    _rev: string;
    _key: string;
    email: string;
}
export declare abstract class IQuery {
    abstract getAllBooks(): Book[] | Promise<Book[]>;
    abstract me(): UserDto | Promise<UserDto>;
}
export declare abstract class IMutation {
    abstract register(createUser: CreateUserInput): RegisterDTO | Promise<RegisterDTO>;
    abstract verify(): UserDto | Promise<UserDto>;
    abstract forgotPassword(email: string): RegisterDTO | Promise<RegisterDTO>;
    abstract resetPassword(newPassword: string): RegisterDTO | Promise<RegisterDTO>;
}
//# sourceMappingURL=graphql.d.ts.map