import {  Body, Controller, Post, Query, Req, Res } from "@nestjs/common";
import { userService } from "./users.service";
import { Request, Response } from "express";
import { signUpDto } from "./dto/signup-user.dto";
import { SignUpResponse } from "./interfaces/signup-response.interface";
import { v4 as uuidv4 } from 'uuid';

@Controller('users')
export class UserController {
  constructor(private readonly appService: userService) {}
  @Post('signup')
  signUpHandler(
    @Body() body: signUpDto,
    @Query() query: object,
    @Req() req: Request,
    @Res() res: Response
  ): Response<SignUpResponse> {
    console.log(body);
    console.log(query);
    this.appService.signup();

    return res.json({
      message: `New user ${body.email} is registered`,
      data: {
        id: uuidv4(),
        username: body.username,
        email: body.email,
      },
    });
  }
}