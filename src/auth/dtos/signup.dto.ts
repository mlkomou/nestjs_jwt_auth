import { IsEmail, IsString, MinLength } from "class-validator";

export class SignupDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
}