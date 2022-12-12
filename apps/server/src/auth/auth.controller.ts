import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  addUser(@Body() user: CreateUserDto) {
    return this.authService.signup(user);
  }

  @Get('/signin')
  getUser() {
    return 'Hello Promo';
  }
}
