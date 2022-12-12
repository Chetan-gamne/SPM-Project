import { Resolver, Query, Field, Context } from '@nestjs/graphql';
import { Book } from './schema/user.schema';

@Resolver((of) => Book)
export class UserResolver {
  @Query((returns) => [Book])
  getAllBooks(@Context('req') request: any) {
    console.log(request.headers);
    return [
      { id: 1, title: 'Harry Potter', price: 500 },
      { id: 2, title: 'Harry Potter', price: 500 },
      { id: 3, title: 'Harry Potter', price: 500 },
      { id: 4, title: 'Harry Potter', price: 500 },
    ];
  }
}
