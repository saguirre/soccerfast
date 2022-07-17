import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@dtos';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.user({ email });
    const passwordValid = await bcrypt.compare(pass, user.password);
    if (user && passwordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { id: user.id, name: user.name, email: user.email };
    user.token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return user;
  }
}
