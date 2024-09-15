import { Module } from '@nestjs/common';
import { ConversionService } from './conversion.service';
import { ConversionController } from './conversion.controller';
import { AppService } from 'src/app.service';

@Module({
  providers: [ConversionService, AppService],
  controllers: [ConversionController]
})
export class ConversionModule {}
