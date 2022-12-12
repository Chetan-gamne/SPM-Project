import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserInput } from './dto/createUser.input';
import { RegisterDTO } from './dto/register.dto';
import { UserDto } from './dto/user.dto';
import { GqlAuthGuard } from './gql-auth.guard';
@Resolver()
export class AuthResolver {
  constructor(private AuthService: AuthService) {}

  @Mutation(() => RegisterDTO)
  register(@Args('createUser') args: CreateUserInput) {
    return this.AuthService.signup(args);
  }

  @Mutation(() => UserDto)
  @UseGuards(GqlAuthGuard)
  verify(@Context('user') user: any) {
    return user;
  }

  @Mutation(() => RegisterDTO)
  forgotPassword(@Args({ name: 'email' }) email: string) {
    // todo: email validation
    return this.AuthService.forgotPassword(email);
  }

  @Mutation(() => RegisterDTO)
  @UseGuards(GqlAuthGuard)
  resetPassword(
    @Args({ name: 'newPassword' }) newPassword: string,
    @Context('user') user: any,
  ) {
    console.log(user);
    console.log('New Password ' + newPassword);
    console.log('uid : ', user.user_id);
    return this.AuthService.updatePassowrd(user.user_id, {
      password: newPassword,
    });
  }

  @Query((returns) => UserDto)
  @UseGuards(GqlAuthGuard)
  me(@Context('user') user: any) {
    return this.AuthService.meData(user.user_id);
  }
}
