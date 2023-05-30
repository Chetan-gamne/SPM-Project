import { Args, Resolver, Mutation, Query, Context } from "@nestjs/graphql";
import { Inject, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserInput } from "./dto/input/createUser.input";
import { RegisterResponseDTO } from "./dto/response/register.dto";
import { UserDto } from "./dto/user.dto";
import { AuthService } from "./auth.service";
import { ResponseDTO } from "./dto/response.dto";
import { RoleGuard } from "./role.guard";
import { Roles } from "./roles.enum";
import { AuthGuard } from "./auth.guard";
import { UserService } from "src/user/user.service";

@Resolver("auth")
export class AuthResolver {
  constructor(
    private AuthService: AuthService,
    private userService: UserService,
  ) {}

  //Mutatation for Registration of new user
  @Mutation(() => RegisterResponseDTO)
  register(@Args("createUser") data: CreateUserInput) {
    try {
      return this.AuthService.register(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Mutation(() => ResponseDTO)
  @UseGuards(AuthGuard)
  verify(@Context() ctx: any) {
    return this.AuthService.verifyEmail(
      ctx.req.user.email,
      ctx.req.user.displayName,
    );
  }

  @Mutation(() => ResponseDTO)
  forgotPassword(@Args("email") email: string) {
    return this.AuthService.forgotPassword(email);
  }

  @Mutation(() => ResponseDTO)
  @UseGuards(AuthGuard)
  resetPassword(@Context() ctx: any, @Args("password") password: string) {
    return this.AuthService.resetPassword(ctx.req.user.email, {
      password: password,
    });
  }

  @Mutation(() => ResponseDTO)
  @UseGuards(AuthGuard)
  updateEmail(@Context() ctx: any, @Args("email") email: string) {
    return this.AuthService.updateEmail(ctx.req.user.email, {
      email: email,
    });
  }

  @Query(() => UserDto)
  @UseGuards(AuthGuard)
  async me(@Context() ctx: any) {
    const user = await this.userService.getUserByEmail(ctx.req.user.email);
    ctx.req.user["dbID"] = user._id;
    return ctx.req.user;
  }
}
