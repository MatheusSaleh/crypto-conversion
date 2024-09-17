import { Controller, Get, Query, UseGuards, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AppService } from "src/app.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ConversionService } from "./conversion.service";

@ApiTags('conversion')
@Controller('conversion')
export class ConversionController {
  constructor(
    private readonly conversionService: ConversionService
  ) {}

  @Get('convert')
  @UseGuards(JwtAuthGuard)
  async convert(
    @Query('fromCoin') fromCoin: string,
    @Query('toCoin') toCoin: string,
    @Query('amount') amount: number,
    @Request() req
  ){
    const userId = req.user.id;
    return this.conversionService.convertCurrency(userId, fromCoin, toCoin, amount);
  }
}