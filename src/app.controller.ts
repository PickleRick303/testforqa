import {
  Controller,
  Get,
  Post,
  Put,
  Query,
  Param,
  Patch,
  Body,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { randomUUID } from 'crypto';
let items = [];

class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

@Controller('items')
export class AppController {
  @Get(':id')
  getItem(@Param('name') id: string, @Query() query: any) {
    // тут ви можете використовувати 'id' та 'query'
    // 'id' - це параметр URL, 'query' - це параметри запиту
    return items.filter((item) => item.id === id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  create(
    @Body(new ValidationPipe({ transform: true })) createUserDto: CreateUserDto,
  ) {
    console.log('Received POST request with body:', createUserDto);
    const item = {
      ...createUserDto,
      id: randomUUID(),
    };
    items.push(item);
    return 'Post request successful';
  }

  @Put(':id')
  updateItem() {
    // логіка для оновлення елементу
  }

  @Patch(':id')
  partialUpdateItem() {
    // логіка для часткового оновлення елементу
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  deleteItem() {
    // логіка для видалення елементу
  }
}
