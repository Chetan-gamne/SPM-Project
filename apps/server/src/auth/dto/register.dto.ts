import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseDTO {
  @Field()
  msg: string;
}
