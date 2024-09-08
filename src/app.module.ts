import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { User } from "./user/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import config from "./auth/config/config";
import { RefreshToken } from "./user/entities/token.entity";

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot({
    database: 'jwtauth',
    host: 'localhost',
    username: 'root',
    password: '*mlkomouml7711ori',
    port: 3306,
    type: 'mysql',
    synchronize: true,
    entities: [User, RefreshToken]
  }), UserModule,
  JwtModule.register({
    secret: 'secret_key'
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    load: [config]
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
