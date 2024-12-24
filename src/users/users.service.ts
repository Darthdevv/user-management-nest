import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/signup-userZod.dto';
// import { signUpDto } from '../users/dto/signup-user.dto';
import { SignUpResponse } from './interfaces/signup-response.interface';
import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';



// eslint-disable-next-line prefer-const
let users : any = [];
Injectable()
export class userService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async signup(body: CreateUserDto): Promise<SignUpResponse> {
    const { username, email, password, confirmPassword, age } = body;

    const isEmailExist = await this.userModel.findOne(
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

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
      age,
    });

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