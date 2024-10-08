import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import { AuthController } from './auth.controller';
import {UsersService} from "../users/users.service";
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './jwt.stategy';



@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: "minhaSuperSecretKey",
      signOptions: {
        expiresIn: "360000s",
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy, PrismaService],
  exports: [
    PassportModule,
    JwtModule
  ],
})
export class AuthModule {
}