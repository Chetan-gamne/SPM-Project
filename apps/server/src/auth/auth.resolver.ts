import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserInput } from './dto/createUser.input';
import { ResponseDTO } from './dto/response.dto';
import { UserDto } from './dto/user.dto';
import { GqlAuthGuard } from './gql-auth.guard';
@Resolver()
export class AuthResolver {
  constructor(private AuthService: AuthService) {}

  // Mutation for Register
  @Mutation(() => ResponseDTO)
  register(@Args('createUser') args: CreateUserInput) {
    return this.AuthService.signup(args);
  }

  // Mutation for Verify
  @Mutation(() => UserDto)
  @UseGuards(GqlAuthGuard)
  verify(@Context('user') user: any) {
    return user;
  }

  // Mutation for Forgot Password
  @Mutation(() => ResponseDTO)
  forgotPassword(@Args({ name: 'email' }) email: string) {
    return this.AuthService.forgotPassword(email);
  }

  // Mutation for ResetPassword
  @Mutation(() => ResponseDTO)
  @UseGuards(GqlAuthGuard)
  resetPassword(
    @Args({ name: 'newPassword' }) newPassword: string,
    @Context('user') user: any,
  ) {
    return this.AuthService.updatePassowrd(user.user_id, {
      password: newPassword,
    });
  }

  // Me Query Return Currently Sign in User
  @Query((returns) => UserDto)
  @UseGuards(GqlAuthGuard)
  me(@Context('user') user: any) {
    console.log(user);
    return this.AuthService.meData(user.user_id);
  }
}
