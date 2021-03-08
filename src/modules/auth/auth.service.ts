import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && user.authenicate(password)) {
      const { password, role, status, ...result } = user;
      const obj = result as any;
      obj.role = user.role.code;
      return obj;
    }
    return null;
  }

  async login(user: any) {
    const { ...data } = user;
    return {
      data,
      access_token: this.jwtService.sign(user),
    };
  }

  renew(user: any) {
    const { iat, exp, ...data } = user;
    return {
      data,
      access_token: this.jwtService.sign(data),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ['Error al registrar usuario'],
          error: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const userRole = user.role;
    const { role, status, ...data } = user;
    const obj = data as any;
    obj.role = userRole.code;
    return {
      data: obj,
      access_token: this.jwtService.sign(obj),
    };
  }
}
