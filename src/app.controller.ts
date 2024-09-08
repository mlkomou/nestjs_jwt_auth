import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AppService } from './app.service';
import { GuardGuard } from "./auth/guards/guard/guard.guard";

@UseGuards(GuardGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  someProtectedRoute(@Req() req: any) {
    return {message: 'Accessed resource', userId: req.userId};
  }
}
