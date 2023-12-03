import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { EditUserDto } from './edit-user.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get users' })
  @ApiQuery({ name: 'login', required: false })
  @ApiQuery({ name: 'email', required: false })
  findAll(
    @Query('login') login?: string,
    @Query('email') email?: string,
  ): any[] {
    return this.usersService.findUsersByParams(login, email);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  findOne(@Query('id') id: number) {
    return this.usersService.findUserById(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
  @Put()
  update(@Body() EditUserDto: EditUserDto) {
    return this.usersService.updateUser(EditUserDto);
  }
}
