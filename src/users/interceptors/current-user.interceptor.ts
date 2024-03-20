import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(
    ctx: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> | Promise<Observable<any>> {
    const request = ctx.switchToHttp().getRequest<any>();

    const { id } = request.session;
    if (id) {
      const user = await this.userService.findOne(id);
      request.currentUser = user;
    }

    return next.handle();
  }
}
