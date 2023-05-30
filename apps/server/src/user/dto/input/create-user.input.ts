import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber } from "class-validator";

@InputType()
export class CreateUserDBInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  age: number;

  @Field({ nullable: true })
  address: string;

  @Field()
  @IsPhoneNumber()
  phone: string;

  @Field({ nullable: true })
  location: string;

  @Field()
  idpService: string;

  @Field()
  idpId: string;

  @Field(() => [String])
  roles: string[];

  @Field({ nullable: true })
  timestamp: Date;
}
