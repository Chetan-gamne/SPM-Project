
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
}

export class Book {
    id: number;
    title: string;
    price: number;
}

export class RegisterDTO {
    msg: string;
}

export class UserDto {
    _id: string;
    _rev: string;
    _key: string;
    email: string;
}

export abstract class IQuery {
    abstract getAllBooks(): Book[] | Promise<Book[]>;

    abstract me(): UserDto | Promise<UserDto>;
}

export abstract class IMutation {
    abstract register(createUser: CreateUserInput): RegisterDTO | Promise<RegisterDTO>;

    abstract verify(): UserDto | Promise<UserDto>;

    abstract forgotPassword(email: string): RegisterDTO | Promise<RegisterDTO>;

    abstract resetPassword(newPassword: string): RegisterDTO | Promise<RegisterDTO>;
}

type Nullable<T> = T | null;
