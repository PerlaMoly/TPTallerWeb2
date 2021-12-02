import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { CourseService } from '../services/course.service';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from '../services/token-storage.service';
import { Course } from 'src/app/interfaces/Course';
import { Router } from '@angular/router';


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
  mensaje: any ;
  course!: Course;
  total=0;

  constructor(  private router: Router,    public courseService: CourseService,public carritoService: CarritoService,private token: TokenStorageService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.total=0;
    this.id_usuario =  this.tokenStorage.getUser().id;
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

            this.carritoService.buscoCarritoUsuario(id_usuario).subscribe(
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
        this.total = 0;
        for (let det of  this.carritoService.detalle){
          this.total = this.total + (det.cantidad*det.precio);
        }

      },
      err =>console.error(err)
    );
  }

 

  eliminarDelCarrito(ID : number): void{
 
    this.carritoService.quitarItem(ID).subscribe(
      res =>{
        this.dameDetalleDelCarrito()
      this.ngOnInit();

      },
      err =>console.error(err)
    );
  }


  
  finalizarCompra(){
    
    console.log(this.id_carrito);
    this.carritoService.finalizarCompra(this.id_carrito).subscribe(
      res =>{ 
        this.router.navigate(['//ordenes']);
 
      },
      err =>console.error(err)
    );
  }

 
}
