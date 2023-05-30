import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GetUserArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { CreateUserDBInput } from "./dto/input/create-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";

import { User } from "./models/user";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => User, { name: "user", nullable: true })
  async getUser(@Args("id") getUserArgs: string): Promise<any> {
    return this.usersService.getUserById(getUserArgs);
  }

  @Query(() => [User], { name: "users", nullable: "items" })
  async getUsers(): Promise<any> {
    return this.usersService.getUsers();
  }

  @Query(() => User, { name: "getUserByEmail", nullable: true })
  async getUserByEmail(@Args("email") email: string): Promise<any> {
    console.log();
    return this.usersService.getUserByEmail(email);
  }
  @Mutation(() => User)
  async createUser(
    @Args("createUserData") createUserData: CreateUserDBInput,
  ): Promise<User> {
    return this.usersService.createUser(createUserData);
  }

  @Mutation(() => User)
  async updateUser(
    @Args("id") id: string,
    @Args("updateUserData") updateUserData: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUserById(id, updateUserData);
  }

  @Mutation(() => User)
  async deleteUser(@Args("id") id: string): Promise<User> {
    return this.usersService.deleteUserById(id);
  }
}
