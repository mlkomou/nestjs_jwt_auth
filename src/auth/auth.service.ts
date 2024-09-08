import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto, SignupDto } from "./dtos/signup.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { v4 as uuidv4 } from 'uuid';
import { RefreshToken } from "../user/entities/token.entity";
import { RefreshTokenDto } from "./dtos/refresh-token.dto";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>,
              private jwtService: JwtService,
              @InjectRepository(RefreshToken)
                private readonly refreshTokenRepository: Repository<RefreshToken>
  ) {
  }
  async signup(userDto: SignupDto) {
    const userInEmail = await this.userRepository.findOneBy({email: userDto.email});
    console.log('userInEmail', userInEmail);
    if (userInEmail) {
      throw new BadRequestException("Ce compte existe deja");
    }
    userDto.password = bcrypt.hashSync(userDto.password, 10);
    await this.userRepository.save(userDto);
  }

  async login(loginDto: LoginDto) {
    const userEmail = await this.userRepository.findOneBy({email: loginDto.email});
    if (!userEmail) {
      throw new UnauthorizedException("Bad email");
    }
     const passwordMatched = await bcrypt.compare(loginDto.password, userEmail.password);
    if (!passwordMatched) {
      throw new UnauthorizedException("Bad password");
    }
    return this.generateUserTokens(userEmail.id);
  }

  async generateUserTokens(userId: any) {
    const accessToken = this.jwtService.sign({userId}, {expiresIn: '1h', secret: 'secret_key'})
    const refreshToken = uuidv4();
    await this.storeRefreshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken
    };
  }

  async storeRefreshToken(token: string, userId: number) {
   let expiryDate: Date = new Date();
    await this.refreshTokenRepository.save(new RefreshToken(token, userId, new Date(expiryDate.setDate(expiryDate.getDate() + 3))));
  }

  async refreshToken(refreshToken: RefreshTokenDto) {
    console.log('refreshToken', refreshToken);
    const foundRefreshToken = await this.refreshTokenRepository.findOneBy({token: refreshToken.refreshToken});
    if (!foundRefreshToken) {
      throw new UnauthorizedException("Token not exist");
    }
    return this.generateUserTokens(foundRefreshToken.userId);
  }
}
