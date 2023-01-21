import {
  Injectable,
  ExecutionContext,
  CanActivate,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import constants from 'src/idp/constants';
import { IIdentityProviderService } from 'src/idp/types';
import { DecodedIdToken } from 'firebase-admin/auth';
//   import { AuthService } from "./auth.service";

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    @Inject(constants.IDENTITY_PROVIDER_SERVICE)
    private IDPService: IIdentityProviderService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = ctx.req.headers.authorization;
    if (!token) {
      throw new HttpException('Not Authenticated', HttpStatus.UNAUTHORIZED);
    }
    const user: DecodedIdToken = await this.IDPService.verify(token);
    console.log(user);
    if (!user) {
      throw new HttpException('Not Authenticated', HttpStatus.UNAUTHORIZED);
    } else {
      ctx.req.user = user;
      return true;
    }
  }
}
