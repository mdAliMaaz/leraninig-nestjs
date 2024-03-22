import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from '../users.service';
import { Request, Response, NextFunction } from 'express';

// to use DI we need to mark the class with @Injectable() and create a private property of userService in constructor of the class like this constructor(private userService: UsersService) {}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.session || {};

    if (id) {
      const user = await this.userService.findOne(id);
    }
    // @ts-ignore
    req.currentUser = user;
  }
}

// in order to use middleware globally we need to configure them in user Module like this export class UsersModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(CurrentUserInterceptor).forRoutes('*');
//   }
// }
