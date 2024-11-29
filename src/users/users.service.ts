import { Injectable } from "@nestjs/common";
import { User } from "./interfaces/user.interface";


Injectable()
export class userService {
  private readonly users: User[] = [];

  signup(user: User) {
    this.users.push(user);
  }

  findAll(): User[] {
    return this.users;
  }
}