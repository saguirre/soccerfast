import { Injectable } from '@nestjs/common';
import { UserService, UserWithRoles } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '@dtos';
import { JwtVerifyOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserModel | null> {
    const user: UserWithRoles = await this.userService.user({ email });
    const passwordValid = await bcrypt.compare(pass, user.password);
    if (user && passwordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserModel) {
    const payload = {
      id: user.id,
      name: user.name,
      roles: user.roles,
      email: user.email,
    };

    delete user.roles;
    user.token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return user;
  }
}
