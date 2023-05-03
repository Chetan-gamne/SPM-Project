import { Field, Int, ObjectType } from "@nestjs/graphql";
import { first, Timestamp } from "rxjs";

@ObjectType()
export class User {
    @Field({nullable:true})
    userId: string;
    
    @Field({nullable:true})
    name: string;

    @Field({nullable:true})
    email: string;

    @Field(() => Int,{nullable: true})
    age: number;

    @Field({ nullable: true })
    userAddress: string;

    @Field({nullable:true})
    phone: number;

    @Field({nullable:true})
    userLocation: string;

    @Field({nullable:true})
    idp: string;

    @Field({nullable:true})
    idp_Id: string;

    @Field({ nullable: true })
    timestamp: Date;





    @Field({ nullable: true })
    isSubscribed?: boolean;
}