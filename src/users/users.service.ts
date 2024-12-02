import { CreateUserDto } from './dto/signup-userZod.dto';
// import { signUpDto } from '../users/dto/signup-user.dto';
import { SignUpResponse } from './interfaces/signup-response.interface';
import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";



// eslint-disable-next-line prefer-const
let users : any = [];
Injectable()
export class userService {
  signup(body: CreateUserDto): SignUpResponse {
    const { username, email, password, confirmPassword, age } = body;

    const isEmailExist: string | undefined = users.find(
      (user: { email: string }) => user.email === email,
    );
    if (isEmailExist) {
      throw new ConflictException(' Email already exists');
    }

    const isUsernameExist: string | undefined = users.find(
      (user: { username: string }) => user.username === username,
    );
    if (isUsernameExist) {
      throw new ConflictException('Username already exists');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const newUser = {
      username,
      email,
      password,
      age,
    };

    users.push(newUser);

    const response: SignUpResponse = {
      message: 'User registered successfully',
      data: {
        email,
        username,
        id: users.length,
      },
    };

    return response;
  }
}