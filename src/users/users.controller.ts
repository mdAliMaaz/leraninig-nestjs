import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serilize } from 'src/interceptor/SerializeInterceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/decoratores/current-user.decorator';
import { User } from './users.entity';
import { AUthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serilize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.id = user.id;
    return user;
  }

  @Post('signin')
  async signInUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.id = user.id;
    return user;
  }

  // @Get('whoami')
  // whoAmI(@Session() session: any) {
  //   return this.usersService.findOne(session.id);
  // }

  @UseGuards(AUthGuard)
  @Get('whoami')
  whoAmi(@CurrentUser() user: User) {
    return user;
  }

  @Post('signout')
  @HttpCode(204)
  signOut(@Session() session: any) {
    return (session.id = null);
  }

  @Get()
  find() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findUserById(@Param() parmas: { id: string }) {
    return this.usersService.findOne(parseInt(parmas.id));
  }

  @Patch(':id')
  updateUser(@Param() parmas: { id: string }, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(parmas.id), body);
  }

  @Delete(':id')
  removeUser(@Param() parmas: { id: string }) {
    return this.usersService.remove(parseInt(parmas.id));
  }
}
