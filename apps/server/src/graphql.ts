
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    email: string;
    name: string;
    password: string;
    address: string;
    phoneNumber: string;
}

export class Book {
    id: number;
    title: string;
    price: number;
}

export class ResponseDTO {
    msg: string;
}

export class UserDto {
    _id: string;
    _rev: string;
    _key: string;
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
    accounCreatedDate: string;
}

export abstract class IQuery {
    abstract getAllBooks(): Book[] | Promise<Book[]>;

    abstract me(): UserDto | Promise<UserDto>;
}

export abstract class IMutation {
    abstract register(createUser: CreateUserInput): ResponseDTO | Promise<ResponseDTO>;

    abstract verify(): UserDto | Promise<UserDto>;

    abstract forgotPassword(email: string): ResponseDTO | Promise<ResponseDTO>;

    abstract resetPassword(newPassword: string): ResponseDTO | Promise<ResponseDTO>;
}

type Nullable<T> = T | null;
