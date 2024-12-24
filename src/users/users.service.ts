import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/signup-userZod.dto';
import { SignUpResponse } from './interfaces/signup-response.interface';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signup(body: CreateUserDto): Promise<SignUpResponse> {
    const { username, email, password, confirmPassword, age } = body;

    // Check if email already exists
    const isEmailExist = await this.userModel.findOne({ email });
    if (isEmailExist) {
      throw new ConflictException('Email already exists');
    }

    // Check if username already exists
    const isUsernameExist = await this.userModel.findOne({ username });
    if (isUsernameExist) {
      throw new ConflictException('Username already exists');
    }

    // Validate password match
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the user
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
      age,
    });

    const savedUser = await newUser.save();

    // Construct the response
    const response: SignUpResponse = {
      message: 'User registered successfully',
      data: {
        email,
        username,
        id: savedUser._id, // Use MongoDB ID
      },
    };

    return response;
  }
}
