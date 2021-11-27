export interface Detalle{
    id: number; 
    id_producto: number; 
    id_carrito: number; 
    cantidad: number; 
    precio: number; 

    
    courses:[
        {
            name:string,
            price:number;
            category:string;
        }
      ]
}