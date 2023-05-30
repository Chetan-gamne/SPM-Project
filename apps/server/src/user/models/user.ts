import { Field, Int, ObjectType } from "@nestjs/graphql";
import { first, Timestamp } from "rxjs";

@ObjectType()
export class User {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => Int, { nullable: true })
  age: number;

  @Field({ nullable: true })
  address: string;

  @Field()
  phone: string;

  @Field()
  location: string;

  @Field()
  idpService: string;

  @Field()
  idpId: string;

  @Field(() => [String])
  roles: string[];

  @Field({ nullable: true })
  timestamp: Date;

  @Field({ nullable: true })
  isSubscribed?: boolean;
}
