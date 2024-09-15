import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, LoginUserDto, UpdatePasswordDto } from './users.user.dto';
import {compare, hash} from 'bcrypt'

interface FormatLogin extends Partial<User>{
  login: string;
}


@Injectable()
export class UsersService {
  
  constructor(
    private prisma: PrismaService
  ){}

  async updatePassword(payload: UpdatePasswordDto, id: number): Promise<User>{
    const user = await this.prisma.user.findUnique({
      where: {id}
    });
    if(!user){
      throw new HttpException("Invalid_credentials", HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await compare(payload.old_password, user.password);

    if(!areEqual){
      throw new HttpException("Invalid_credentials", HttpStatus.UNAUTHORIZED);
    }

    return await this.prisma.user.update({
      where: {id},
      data: {password: await hash(payload.new_password, 10)}
    })
  }

  async create(userDto: CreateUserDto): Promise<any> {
    const userInDb = await this.prisma.user.findFirst({
      where: {login: userDto.login}
    });
    if(userInDb){
      throw new HttpException("User_already_exists", HttpStatus.CONFLICT);
    }
    return await this.prisma.user.create({
      data: {
        ...userDto,
        role: "CLIENT", 
        password: await hash(userDto.password, 10)
      }
    });
    
  }

  async findByLogin({login, password}: LoginUserDto): Promise<FormatLogin>{
    const user = await this.prisma.user.findFirst({
      where: {login}
    });

    if(!user){
      throw new HttpException("Invalid_credentials", HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await compare(password, user.password);

    if(!areEqual){
      throw new HttpException("Invalid_credentials", HttpStatus.UNAUTHORIZED);
    }

    const {password: p, ...rest} = user;
    return rest;
  }

  async findByPayload({login}: any): Promise<any>{
    return await this.prisma.user.findFirst({
      where: {login}
    });
  }
}
