import {
  Injectable,
  ExecutionContext,
  CanActivate,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = ctx.req.headers.authorization;
    // console.log(token);
    if (!token) {
      throw new HttpException('Not Authenticated', HttpStatus.UNAUTHORIZED);
    }
    const user = this.authService.verifyByToken(token);
    console.log(user);
    if (!user) {
      throw new HttpException('Not Authenticated', HttpStatus.UNAUTHORIZED);
    } else {
      ctx.user = user;
      return true;
    }
  }
}
