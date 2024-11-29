import {  Body, Controller, Post, Req, Res } from "@nestjs/common";
import { userService } from "./users.service";
import { Request, Response } from "express";
import { signUpDto } from "./dto/signup-user.dto";

@Controller('users')
export class UserController {
  constructor(private readonly appService: userService) {}
  @Post('signup')
  signUpHandler(
    @Body() body: signUpDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    console.log(body);
    console.log(req.query);
    const response = this.appService.signup();

    return res.json({ message : response });
  }
}