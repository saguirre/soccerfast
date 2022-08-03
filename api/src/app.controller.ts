import { InjectQueue } from '@nestjs/bull';
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Queue } from 'bull';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UserService } from './user/user.service';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private readonly jwtService: JwtService,
    @InjectQueue('forgot-password') private readonly forgotPasswordQueue: Queue,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/verify')
  async validateUserToken(@Request() req) {
    // If the request passed the JwtAuthGuard then we have a valid token
    return true;
  }

  @Post('auth/change-password')
  async changePassword(@Request() req, @Body() body: { password: string }) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = this.jwtService.decode(token);
      const user = await this.userService.user({
        email: decodedToken['email'],
      });
      if (user) {
        const isValidToken = user.passwordRecoveryToken === token;
        if (isValidToken) {
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(body.password, salt);
          await this.userService.updateUser({
            where: { email: decodedToken['email'] },
            data: { password: hashedPassword, passwordRecoveryToken: '' },
          });
        }
        return isValidToken;
      }
    }
    return false;
  }

  @Get('auth/validate-recovery-token')
  async validateRecoveryToken(@Request() req) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = this.jwtService.decode(token);
      const user = await this.userService.user({
        email: decodedToken['email'],
      });
      if (user) {
        return user.passwordRecoveryToken === token;
      }
    }
    return false;
  }

  @Get('auth/validate-activation-token')
  async validateActivationToken(@Request() req) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = this.jwtService.decode(token);
      const user = await this.userService.user({
        email: decodedToken['email'],
      });
      if (user) {
        return user.activationToken === token;
      }
    }
    return false;
  }

  @Put('auth/activate-account')
  async activateAccount(@Request() req) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = this.jwtService.decode(token);
      const user = await this.userService.user({
        email: decodedToken['email'],
      });
      if (user) {
        const isValidToken = user.activationToken === token;
        if (isValidToken) {
          await this.userService.updateUser({
            where: { email: decodedToken['email'] },
            data: { activated: true, activationToken: '' },
          });
        }
        return isValidToken;
      }
    }
    return false;
  }

  @Post('auth/signup')
  async signUp(@Request() req) {
    return this.userService.createUser(req.body);
  }

  @Post('auth/forgot-password/:locale')
  async sendForgotPassword(
    @Param('locale') locale: string = 'es',
    @Body() body: { email: string },
  ) {
    if (body.email?.length) {
      const user = await this.userService.user({ email: body.email });
      if (user && !user.locked) {
        const payload = {
          name: user.name,
          email: user.email,
        };

        const passwordRecoveryToken = this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
        });

        await this.userService.updateUser({
          where: { id: Number(user.id) },
          data: { passwordRecoveryToken },
        });

        this.forgotPasswordQueue.add('forgot-password', {
          name: user.name,
          email: user.email,
          url: `http://localhost:3000/forgot-password?token=${passwordRecoveryToken}`,
          locale,
        });
      }
    }
  }
}
