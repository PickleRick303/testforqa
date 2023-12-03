import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  age: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  password: string;

  // Додайте інші властивості за потребою
}
