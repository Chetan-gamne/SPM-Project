import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('/hello')
  getStatus(): string {
    return 'Server is running';
  }
}
