import { RoleEnum } from '../enums';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { headers } = context.switchToHttp().getRequest();
    const extractedToken = headers?.authorization?.split(' ')[1];
    const decodedToken = this.jwtService.decode(extractedToken);
    let roles = decodedToken['roles'];
    if (roles && roles?.length) {
      roles = roles.map((role) => role.role);
      return requiredRoles.some((role) => roles?.includes(role));
    }
    return false;
  }
}
