
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    email: string;
    password: string;
    phone: string;
}

export class IClaims {
    cs?: Nullable<string[]>;
    admin?: Nullable<string[]>;
}

export class RegisterResponseDTO {
    id: string;
    email: string;
    claims?: Nullable<IClaims>;
    isEnabled?: Nullable<boolean>;
}

export class UserDto {
    name?: Nullable<string>;
    email: string;
    uid: string;
    email_verified: boolean;
    phone_number?: Nullable<string>;
}

export class ResponseDTO {
    msg?: Nullable<string>;
}

export abstract class IQuery {
    abstract me(): UserDto | Promise<UserDto>;
}

export abstract class IMutation {
    abstract register(createUser: CreateUserInput): RegisterResponseDTO | Promise<RegisterResponseDTO>;

    abstract verify(): ResponseDTO | Promise<ResponseDTO>;

    abstract forgotPassword(email: string): ResponseDTO | Promise<ResponseDTO>;

    abstract resetPassword(password: string): ResponseDTO | Promise<ResponseDTO>;
}

type Nullable<T> = T | null;
