import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // NestJS כבר ביצע ולידציה. אם הגענו לפה - המידע תקין!
    return this.usersService.create(createUserDto);
  }
}
