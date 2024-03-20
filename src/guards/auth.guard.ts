import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

export class AUthGuard implements CanActivate {
  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = ctx.switchToHttp().getRequest<Request>();

    return request.session?.id;
  }
}
