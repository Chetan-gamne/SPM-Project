
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

export class CreateGrainInput {
    name: string;
    type?: Nullable<string>;
    description: string;
    price: number;
    nutrition: string;
    imgUrl?: Nullable<string>;
}

export class UpdateGrainInput {
    name?: Nullable<string>;
    type?: Nullable<string>;
    description?: Nullable<string>;
    price?: Nullable<number>;
    nutrition?: Nullable<string>;
    imgUrl?: Nullable<string>;
    id: string;
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

export class Grain {
    _id: string;
    name: string;
    description: string;
    type?: Nullable<string>;
    price: number;
    nutrition: string;
    imgUrl?: Nullable<string>;
}

export abstract class IQuery {
    abstract me(): UserDto | Promise<UserDto>;

    abstract grains(): Grain[] | Promise<Grain[]>;

    abstract grain(id: string): Grain | Promise<Grain>;
}

export abstract class IMutation {
    abstract register(createUser: CreateUserInput): RegisterResponseDTO | Promise<RegisterResponseDTO>;

    abstract verify(): ResponseDTO | Promise<ResponseDTO>;

    abstract forgotPassword(email: string): ResponseDTO | Promise<ResponseDTO>;

    abstract resetPassword(password: string): ResponseDTO | Promise<ResponseDTO>;

    abstract createGrain(createGrainInput: CreateGrainInput): Grain | Promise<Grain>;

    abstract updateGrain(updateGrainInput: UpdateGrainInput): Grain | Promise<Grain>;

    abstract removeGrain(id: string): Grain | Promise<Grain>;
}

type Nullable<T> = T | null;
