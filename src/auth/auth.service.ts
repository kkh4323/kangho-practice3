import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  // 회원가입
  async signupUser(createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.userService.createUser(createUserDto);
      createdUser.password = undefined;
      console.log(createdUser);
      // await this.emailService.sendMail({
      //   to: createUserDto.email,
      //   subject: 'welcome ',
      //   text: 'welcome to kangho world',
      // });
      return createdUser;
    } catch (error) {
      console.log(typeof error?.code);
      if (error?.code === '23505') {
        throw new HttpException(
          'user with that email alreadu exists',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  // 로그인하는 로직
  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(loginUserDto.email);
    const isPasswordMatched = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new HttpException('password do not match', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
