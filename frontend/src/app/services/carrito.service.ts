import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Carrito } from '../models/carrito';
import { Detalle } from '../models/detalle';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
   
  constructor(private http: HttpClient) { }

  URL_API='http://localhost:3000/'

    detalle : Detalle[] = []; 
    carrito : Carrito | undefined; 
    ordenes : Carrito[] = []; 
 
 

  dameDetalleDelCarrito(idCarrito: number){
    return this.http.get<Detalle[]>(this.URL_API+'detalle/'+idCarrito);
  }

  agregarAlCarrito(cantidad: number,id_carrito:number,precio:number,id_producto:number) :Observable<any>{ 
    return this.http.post(this.URL_API+'detalle',{
      cantidad,
      id_carrito,
      precio,
      id_producto
    }, httpOptions)
    
  }


  
  quitarItem(ID: number):Observable<any>{
    const cantidad:number = 0;
    console.log(JSON.stringify({
      cantidad: cantidad}));

    return this.http.put<Detalle[]>(this.URL_API+'detalle/'+ID, JSON.stringify({
      cantidad: cantidad})
      , httpOptions);
  }


  
  buscoCarritoUsuario(id_usuario:number){
    return  this.http.get<Carrito>(this.URL_API+'carrito/buscarMiCarrito/'+id_usuario+'/1');
  }

    
  dameOrdenes(id_usuario:number){
    return  this.http.get<Carrito[]>(this.URL_API+'carrito/buscarMisOrdenes/'+id_usuario);
  }
  
  crearCarrito(id_usuario:number): Observable<any>{
    return this.http.post<Carrito>(this.URL_API+'carrito/', JSON.stringify({
      id_usuario: id_usuario,
       estado: 1,
       total:0 })
      , httpOptions);
  }


  finalizarCompra(id_carrito:number){
    return this.http.get<Carrito>(this.URL_API+'carrito/finalizarCarrito/'+id_carrito);
  }

  



}
