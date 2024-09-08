import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from "./dtos/signup.dto";
import { RefreshTokenDto } from "./dtos/refresh-token.dto";
import { RefreshToken } from "../user/entities/token.entity";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('signup')
   signup(@Body() signupUserDto: SignupDto) {
    return this.authService.signup(signupUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  refreshToken(@Body() refreshToken: RefreshTokenDto) {
    return this.authService.refreshToken(refreshToken);
  }

}
