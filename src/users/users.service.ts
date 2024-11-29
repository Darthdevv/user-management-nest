import { Injectable } from "@nestjs/common";
import { User } from "./interfaces/user.interface";


Injectable()
export class userService {
  private readonly users: User[] = [];

  signup() {
    return 'signup function'
  }

  findAll(): User[] {
    return this.users;
  }
}