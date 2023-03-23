
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    name: UserName;
    email: string;
    password: string;
    phone: string;
}

export class UserName {
    firstName: string;
    lastName: string;
}

export class CreateProductInput {
    title: string;
    description?: Nullable<string>;
    price: number;
    grains: Grains[];
}

export class Grains {
    grain: string;
    proportion: number;
}

export class UpdateProductInput {
    _id: string;
    body: CreateProductInput;
}

export class CreateStoreInput {
    address: string;
    latitude: string;
    longitude: string;
    Inventory: Inventory[];
}

export class Inventory {
    grain_id: string;
    quantity: number;
}

export class UpdateStoreInput {
    _id: string;
    body: UpdateStoreInputBody;
}

export class UpdateStoreInputBody {
    address?: Nullable<string>;
    latitude?: Nullable<string>;
    longitude?: Nullable<string>;
    Inventory?: Nullable<Inventory[]>;
}

export class RegisterResponseDTO {
    id: string;
    email: string;
    role: string;
    creationTime: string;
    emailVerified: boolean;
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
    grain: string;
    proportion: string;
}

export class Product {
    _id?: Nullable<string>;
    title: string;
    description?: Nullable<string>;
    price?: Nullable<number>;
    grains: Grain[];
    storeOwnerId?: Nullable<string>;
}

export class StoreResponse {
    _id: string;
    address: string;
    latitude: string;
    longitude: string;
    Inventory: InventoryResponse[];
}

export class InventoryResponse {
    grain_id: string;
    quantity: number;
}

export abstract class IQuery {
    abstract me(): UserDto | Promise<UserDto>;

    abstract getProducts(): Product[] | Promise<Product[]>;

    abstract getAllStores(): StoreResponse[] | Promise<StoreResponse[]>;

    abstract getStore(_id: string): StoreResponse | Promise<StoreResponse>;
}

export abstract class IMutation {
    abstract register(createUser: CreateUserInput): RegisterResponseDTO | Promise<RegisterResponseDTO>;

    abstract verify(): ResponseDTO | Promise<ResponseDTO>;

    abstract forgotPassword(email: string): ResponseDTO | Promise<ResponseDTO>;

    abstract resetPassword(password: string): ResponseDTO | Promise<ResponseDTO>;

    abstract createProduct(create: CreateProductInput): Product | Promise<Product>;

    abstract updateProduct(update: UpdateProductInput): Product | Promise<Product>;

    abstract deleteProduct(_id: string): string | Promise<string>;

    abstract createStore(createStoreInput: CreateStoreInput): StoreResponse | Promise<StoreResponse>;

    abstract updateStore(updateStoreInput: UpdateStoreInput): StoreResponse | Promise<StoreResponse>;

    abstract deleteStore(_id: string): string | Promise<string>;
}

type Nullable<T> = T | null;
