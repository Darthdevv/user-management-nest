import { SignUpResponse } from './interfaces/signup-response.interface';
import {  Body, Controller, Post, Query, Req, Res } from "@nestjs/common";
import { userService } from "./users.service";
import { Request, Response } from "express";
import { signUpDto } from "./dto/signup-user.dto";


@Controller('users')
export class UserController {
  constructor(private readonly userService: userService) {}
  @Post('signup')
  signUpHandler(
    @Body() body: signUpDto,
    @Query() query: object,
    @Req() req: Request,
    @Res() res: Response
  ): Response {
    const response: SignUpResponse = this.userService.signup(body);

    return res.json({
      message: response,
    });
  }
}