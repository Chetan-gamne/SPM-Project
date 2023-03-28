import { InputType, Field } from "@nestjs/graphql";

@InputType()
class UserName {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  name: UserName;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  phone: string;
}
