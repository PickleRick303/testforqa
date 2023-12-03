import { ApiProperty } from '@nestjs/swagger';

export class EditUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  login: string;

  @ApiProperty()
  age: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  password: string;

  // Додайте інші властивості за потребою
}
