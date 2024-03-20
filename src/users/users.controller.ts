import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serilize } from 'src/interceptor/SerializeInterceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serilize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.singup(body.email, body.password);
  }

  @Post('/signin')
  signInUser(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
  }

  @Get()
  find() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  findUserById(@Param() parmas: { id: string }) {
    return this.usersService.findOne(parseInt(parmas.id));
  }

  @Patch('/:id')
  updateUser(@Param() parmas: { id: string }, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(parmas.id), body);
  }

  @Delete('/:id')
  removeUser(@Param() parmas: { id: string }) {
    return this.usersService.remove(parseInt(parmas.id));
  }
}
