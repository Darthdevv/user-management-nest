import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/signup-userZod.dto';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { signUpSchema } from './dto/signup-userZod.dto';

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
}
