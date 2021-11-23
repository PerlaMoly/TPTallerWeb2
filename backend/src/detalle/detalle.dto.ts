import { ApiProperty } from '@nestjs/swagger';

export class DetalleDTO {
 
  @ApiProperty()
  id_producto:number;

  @ApiProperty()
  cantidad:number;
  
  @ApiProperty()
  id_carrito:number;

  @ApiProperty()
  precio:number;
  
  
}
