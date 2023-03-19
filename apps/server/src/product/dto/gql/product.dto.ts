import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Grain {
  @Field()
  grain: string;
  @Field()
  proportion: string;
}

@ObjectType()
export class Product {
  @Field({ nullable: true })
  _id?: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  price?: number;

  @Field(() => [Grain])
  grains: Array<Grain>;

  @Field({ nullable: true })
  storeOwnerId?: string;
}
