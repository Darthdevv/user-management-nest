import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto, logInDto } from './dto/auth-userZod.dto';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { signUpSchema, signInSchema } from './dto/auth-userZod.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @UsePipes(new ZodValidationPipe(signUpSchema))
  async signUpHandler(
    @Body() body: CreateUserDto,
  ): Promise<{ message: string; data: any }> {
    const response = await this.userService.signup(body);

    return {
      message: response.message,
      data: response.data,
    };
  }

  @Post('signin')
  @UsePipes(new ZodValidationPipe(signInSchema))
  async signInHandler(
    @Body() body: logInDto,
  ): Promise<{ message: string; data: any }> {
    const response = await this.userService.signin(body);

    return {
      message: response.message,
      data: response.data,
    };
  }
}
