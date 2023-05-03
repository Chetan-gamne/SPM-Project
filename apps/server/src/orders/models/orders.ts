import { Field, Int, ObjectType } from "@nestjs/graphql";
import { first, Timestamp } from "rxjs";

@ObjectType()
export class Orders {
    @Field()
    user_id:string;
    @Field()
    address:string;
    @Field()
    contact_info:string;
    @Field()
    amount:number;
    @Field()
    transaction_id:string;    
}