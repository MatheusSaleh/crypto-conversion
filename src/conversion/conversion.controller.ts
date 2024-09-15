import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AppService } from "src/app.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags('conversion')
@Controller('conversion')
export class ConversionController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('teste')
  getHello(): string {
    return this.appService.getHello();
  }
}