import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import config from "./auth/config/config";
import { TypeOrmConfigService } from './type-orm-config/type-orm-config.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useClass: TypeOrmConfigService
  }), UserModule,
  JwtModule.register({
    secret: 'secret_key'
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    load: [config],
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


