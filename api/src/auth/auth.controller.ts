import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
import { Public } from 'src/decorators/isPublic.decorator';
import { LoginUserDto } from 'src/users/loginUserDto';
import { CreateUserDto } from 'src/users/createUserDto';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    signIn(@Body() signInDto: LoginUserDto) {
      return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    @Public()
    register(@Body() registerDto: CreateUserDto) {
      return this.authService.register(registerDto.firstName, registerDto.lastName, registerDto.email, registerDto.password);
    }
  
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }