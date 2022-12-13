import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserInput } from './dto/createUser.input';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  addUser(@Body() user: CreateUserInput) {
    return this.authService.signup(user);
  }

  @Get('/signin')
  getUser() {
    return 'Hello Promo';
  }
}
