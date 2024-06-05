import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UnprocessableEntityException
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
import { Public } from 'src/decorators/isPublic.decorator';
import { LoginUserDto } from 'src/users/loginUserDto';
import { CreateUserDto } from 'src/users/createUserDto';
import { ERROR_CODES } from 'src/errorCodes';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    async signIn(@Body() signInDto: LoginUserDto) {
      try {
        return await this.authService.signIn(signInDto.email, signInDto.password);
      }
      catch(error) {
        if(error.message === ERROR_CODES.INCORRECT_PASSWORD) {
          throw new UnprocessableEntityException("Password is incorrect.");
        }
        throw new UnprocessableEntityException(error.message);
      }
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    @Public()
    async register(@Body() registerDto: CreateUserDto) {
      try {
        return await this.authService.register(registerDto.firstName, registerDto.lastName, registerDto.email, registerDto.password);
      }
      catch(error) {
        console.log(error.code);
        if(error.code === ERROR_CODES.DUPLICATE_ENTRY) {
          throw new UnprocessableEntityException("Email is already registered.");
        }
        throw new UnprocessableEntityException(error.message);
      }
    }
  
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }