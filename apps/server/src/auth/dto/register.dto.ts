import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisterDTO {
  @Field()
  msg: string;
}
