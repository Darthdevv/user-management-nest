import { IsEmail, IsInt, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class signUpDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(8)
  email: string;

  @IsInt()
  @Min(10)
  age: number;
}