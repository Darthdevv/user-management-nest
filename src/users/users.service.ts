import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, logInDto } from './dto/auth-userZod.dto';
import {
  SignInResponse,
  SignUpResponse,
} from './interfaces/auth-response.interface';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

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

  async signin(body: logInDto): Promise<SignInResponse> {
    const { email, password } = body;

    // Find user by email
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT Token
    const payload = { username: user.username, sub: user._id };
    const token = this.jwtService.sign(payload);

    // Construct the response
    const response: SignInResponse = {
      message: 'Sign in successful',
      data: {
        role: user.role,
        username: user.username,
        id: user._id,
        token,
      },
    };

    return response;
  }
}
