import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from "../user/entities/user.entity";
import { RefreshToken } from "../user/entities/token.entity";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: 3306,
      username: this.configService.get<string>('DABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [User, RefreshToken],
      synchronize: false,
    };
  }
}