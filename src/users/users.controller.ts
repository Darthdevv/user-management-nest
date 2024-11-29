import {  Controller, Post, Req, Res } from "@nestjs/common";
import { userService } from "./users.service";
import { Request, Response } from "express";

@Controller('users')
export class UserController {
  constructor(private readonly appService: userService) {}
  @Post('signup')
  signUpHandler(
    @Req() req: Request,
    @Res() res: Response
  ) {
    console.log(req.body);
    console.log(req.query);
    const response = this.appService.signup();

    return res.json({ message : response });
  }
}