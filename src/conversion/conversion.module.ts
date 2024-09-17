import { Module } from '@nestjs/common';
import { ConversionService } from './conversion.service';
import { ConversionController } from './conversion.controller';
import { AppService } from 'src/app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PrismaModule],
  providers: [ConversionService, AppService, UsersService],
  controllers: [ConversionController],
  exports: [ConversionService],
})
export class ConversionModule {}
