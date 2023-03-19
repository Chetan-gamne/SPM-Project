import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateProductInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  price: number;

  @Field(() => [Grains])
  grains: Array<Grains>;
}

@InputType()
export class UpdateProductInput {
  @Field()
  _id: string;

  @Field()
  body: CreateProductInput;
}

@InputType()
export class UpdateInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  price?: number;

  @Field(() => [Grains], { nullable: true })
  grains?: Array<Grains>;
}

@InputType()
export class Grains {
  @Field()
  grain: string;
  @Field()
  proportion: number;
}
