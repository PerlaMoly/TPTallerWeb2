import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { CourseService } from '../services/course.service';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from '../services/token-storage.service';
import { Course } from 'src/app/interfaces/Course';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {
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
    this.dameOrdenes(this.id_usuario);
   }




   dameOrdenes(id_usuario:number){
    this.carritoService.dameOrdenes(id_usuario).subscribe( 
          res =>{
           
                this.carritoService.ordenes = res;
  
              },
              err =>console.error(err)
            );

 

  }
 
 
}
