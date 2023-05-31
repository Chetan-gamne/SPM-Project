import {
  Injectable,
  ExecutionContext,
  CanActivate,
  HttpException,
  HttpStatus,
  Inject,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import constants from "src/idp/constants";
import { IIdentityProviderService } from "src/idp/types";
import { DecodedIdToken } from "firebase-admin/auth";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(constants.IDENTITY_PROVIDER_SERVICE)
    private IDPService: IIdentityProviderService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    let token = "";
    const XClientType = ctx.req.headers.xclienttype;
    if (XClientType == "mobile") {
      token = ctx.req.headers.authorization;
    } else {
      console.log("From web ");
      token = ctx.req.cookies["token"]; //check that request coming from any web browser
    }
    console.log(token);
    if (!token) {
      throw new HttpException("Not Authenticated", HttpStatus.UNAUTHORIZED);
    }
    const user: DecodedIdToken = await this.IDPService.verify(token);
    // const dbUser: any = await this.AuthService.getUserByDB(user.email);
    // user["userDBId"] = dbUser._id;
    console.log(user);
    if (!user) {
      throw new HttpException("Not Authenticated", HttpStatus.UNAUTHORIZED);
    } else {
      ctx.req.user = user;
      return true;
    }
  }
}