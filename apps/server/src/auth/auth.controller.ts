import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response, response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Post('/login')
  getHello(@Req() request: Request, @Res() response: Response): string {
    // return response.cookie("");
    return 'Hello';
  }
}
