import { signUpDto } from './dto/signup-user.dto';
import { SignUpResponse } from './interfaces/signup-response.interface';
import { ConflictException, Injectable } from "@nestjs/common";


// eslint-disable-next-line prefer-const
let users = [];
Injectable()
export class userService {
  signup(body: signUpDto): SignUpResponse {
    const { username, email, password, age } = body;

    const isEmailExist: string | undefined = users.find(user => user.email === email);
    if (isEmailExist) {
      throw new ConflictException(' Email already exists')
    }

    const isUsernameExist: string | undefined = users.find(user => user.username === username);
    if (isUsernameExist) {
      throw new ConflictException('Username already exists')
    }

    const newUser = {
      username,
      email,
      password,
      age
    };

    users.push(newUser);

    const response : SignUpResponse =  {
      message: 'User registered successfully',
      data: {
        email,
        username,
        id: users.length
      }
    };

    return response;
  }
}