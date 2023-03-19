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

@Injectable()
export class RoleGuard implements CanActivate {
  private rolesPassed: string[];
  constructor(roles: string[]) {
    this.rolesPassed = roles;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    return this.rolesPassed.includes(ctx.req.user.role);
    // return ctx.req.user.role == this.rolePassed;
  }
}
