import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { RefreshToken } from "../user/entities/token.entity";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  imports: [TypeOrmModule.forFeature([User, RefreshToken])]
})
export class AuthModule {}
