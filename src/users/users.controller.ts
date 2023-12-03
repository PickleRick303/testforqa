import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  Delete,
} from '@nestjs/common';
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
  findAll(@Query('login') login?: string): any[] {
    return this.usersService.findUsersByParams(login);
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
  @Delete()
  delete(@Query('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
