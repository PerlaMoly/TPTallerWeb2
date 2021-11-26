import { ApiProperty } from '@nestjs/swagger';

export class CourseDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  hours: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  category: string; //20211125

  @ApiProperty()
  imageURL: string;
}
