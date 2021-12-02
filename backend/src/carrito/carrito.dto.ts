import { ApiProperty } from '@nestjs/swagger';

export class CarritoDTO {
 
  @ApiProperty()
  id_usuario:number;

  @ApiProperty()
  estado:number;
  
  @ApiProperty()
  total:number;
}
