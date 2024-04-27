import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입
  @Post('/signup')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    // console.log(createUserDto);
    return await this.authService.signupUser(createUserDto);
  }

  // 로그인
  @Post('/login')
  async loggedInUser(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.loginUser(loginUserDto);
  }
}
