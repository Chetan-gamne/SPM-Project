import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field()
  _id: string;

  @Field()
  _rev: string;

  @Field()
  _key: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  address: string;

  @Field()
  phoneNumber: string;

  @Field()
  accounCreatedDate: string;
}
