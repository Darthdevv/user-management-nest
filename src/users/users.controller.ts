import { SignUpResponse } from './interfaces/signup-response.interface';
import {  Body, Controller, Post, Query, Req, Res, UsePipes } from "@nestjs/common";
import { userService } from "./users.service";
import { Request, Response } from "express";
// import { signUpDto } from "./dto/signup-user.dto";
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { signUpSchema } from './dto/signup-userZod.dto';




@Controller('users')
export class UserController {
  constructor(private readonly userService: userService) {}

  @Post('signup')
  @UsePipes(new ZodValidationPipe(signUpSchema))
  signUpHandler(
    @Body() body: any,
    @Query() query: object,
    @Req() req: Request,
    @Res() res: Response,
  ): any {
    // Log the body for debugging
    console.log('Request Body:', body); // Log the raw body

    const response: SignUpResponse = this.userService.signup(body);

    return res.json({
      message: response,
    });
  }
}
