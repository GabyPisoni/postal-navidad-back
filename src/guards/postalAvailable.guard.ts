import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UNAUTHORIZED_TOKEN } from 'src/utils/const';

@Injectable()
export class PostalGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth;

    if (token && token === process.env.TOKEN_GUARD) return true;
    throw new UnauthorizedException(UNAUTHORIZED_TOKEN);
  }
}
