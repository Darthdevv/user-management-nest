import { Controller, Get } from "@nestjs/common";
import { userService } from "./users.service";

@Controller('users')
export class UserController {
  constructor(private readonly appService: userService) {}
  @Get('signup')
  signUp(): string {
    return this.appService.signup();
  }
}