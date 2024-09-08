import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Observable } from 'rxjs';
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class GuardGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
   const request = context.switchToHttp().getRequest();
   const token = this.extractTokenFromHeader(request);
   if (!token) {
     throw new UnauthorizedException("Token not valid");
   }

   try {
      const payload = this.jwtService.verify(token, {secret: 'secret_key'});
      request.userId = payload.userId;
   } catch (e) {
    Logger.error(e.message());
   }

   return true;
  }

  private extractTokenFromHeader(request: Request) {
    return request.headers.authorization?.split(' ')[1];
  }
}
