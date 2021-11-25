import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  currentUser: any;
  cantidad = 1;
  id_producto = 1;
  precio = 1;
  id_carrito = 0   ;
  id_usuario: any ;
 
  constructor(public carritoService: CarritoService,private token: TokenStorageService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  //  this.id_usuario = this.token.getUser()["id"]+1;
    this.id_usuario =  this.tokenStorage.getUser().id+1;
    this.dameCarrito(this.id_usuario);
    this.dameDetalleDelCarrito();
  }




  dameCarrito(id_usuario:number){
    this.carritoService.buscoCarritoUsuario(id_usuario).subscribe( 
          res =>{
            this.carritoService.carrito = res;
            if(res==null){

                    this.carritoService.crearCarrito(id_usuario).subscribe(
                      res =>{
                      },
                      err =>console.error(err)
                    );
            } 

            this.carritoService.dameMiCarrito(id_usuario).subscribe(
              res =>{
                this.carritoService.carrito = res;
                this.id_carrito = this.carritoService.carrito.id;
                this.dameDetalleDelCarrito();

              },
              err =>console.error(err)
            );



          },
          err =>console.error(err)
        );



  }

  dameDetalleDelCarrito(){
    const idCarrito= this.id_carrito;
    this.carritoService.dameDetalleDelCarrito(idCarrito).subscribe(
      res =>{
        this.carritoService.detalle = res;
      },
      err =>console.error(err)
    );
  }


  agregarAlCarrito(): void{
    if(this.id_carrito==0){
      this.dameCarrito(this.id_usuario);

    }
  else{ 
   this.carritoService.agregarAlCarrito(this.cantidad,this.id_carrito,this.precio,this.id_producto).subscribe(
      res =>{
        this.dameDetalleDelCarrito()
      },
      err =>console.error(err)
    );

  } 

  }


  eliminarDelCarrito(ID : number): void{
 
    this.carritoService.quitarItem(ID).subscribe(
      res =>{
        this.dameDetalleDelCarrito()
      },
      err =>console.error(err)
    );
  }


   
}