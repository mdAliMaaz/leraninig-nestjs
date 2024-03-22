import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {

    const users = await this.userService.find(email);

    if (users) {
      throw new BadRequestException('email in use');
    } else {
      const salt = randomBytes(8).toString('hex');

      const hash = (await scrypt(password, salt, 32)) as Buffer;

      const hashedPassword = `${salt}.${hash.toString('hex')}`;

      const user = await this.userService.create(email, hashedPassword);

      return user;
    }
  }

  async signin(email: string, password: string) {
    const user = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, hash] = user.password.split('.');

    const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;

    if (hashedPassword.toString('hex') !== hash) {
      throw new BadRequestException('wrong password');
    } else {
      return user;
    }
  }
}
