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
//   import { AuthService } from "./auth.service";

@Injectable()
export class RoleGuard implements CanActivate {
  private rolePassed: string;
  constructor(role: string) {
    this.rolePassed = role;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req.user.role == this.rolePassed;
  }
}
