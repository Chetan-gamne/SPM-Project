import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    let user = await this.authService.verifyByToken(token);
    if (!user) {
      throw new HttpException('Not Authenticated', HttpStatus.UNAUTHORIZED);
    } else {
      req['user'] = user;
      console.log('inside Middleware' + req['user']);
      next();
    }
  }
}
