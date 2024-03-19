import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serilize } from 'src/interceptor/SerializeInterceptor';
import { UserDto } from './dto/user.dto';

@Controller('auth')
@Serilize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body.email, body.password);
  }

  @Get()
  find() {
    return this.usersService.find();
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
