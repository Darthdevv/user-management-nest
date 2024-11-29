import { Controller, Get } from "@nestjs/common";

@Controller('users')
export class UserController {
  @Get('signup')
  signUp(): string {
    return 'This action registers a new user';
  }
}