import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces/Course';
import { CourseService } from '../services/course.service';
import { CarritoService } from '../services/carrito.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.css'],
})
export class ShowCourseComponent implements OnInit {
  courses!: Course[];

  course!: Course;

  currentUser: any;
  cantidad = 1;
  id_producto!: number;
  precio = 1;
  id_carrito = 0;
  id_usuario: any;

  constructor(
    private courseService: CourseService,
    private carritoService: CarritoService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.courseService.getCourse(id).subscribe(
      (res) => (this.course = res),

      (err) => console.log(err)
    );
  }

  agregarAlCarrito(price: number, id_producto: number) {
    //20211125
    this.id_usuario = this.tokenStorage.getUser().id; //obtengo id del usuario logueado;
    this.carritoService.dameMiCarrito(this.id_usuario);
    {
      this.carritoService.buscoCarritoUsuario(this.id_usuario).subscribe(
        (res) => {
          this.carritoService.carrito = res;
          this.id_carrito = res.id;
          if (res == null) {
            this.carritoService.crearCarrito(this.id_usuario).subscribe(
              (res) => {
                this.id_carrito = res.id;
              },
              (err) => console.error(err)
            );
          }
          if (this.id_carrito != 0) {
            this.carritoService
              .agregarAlCarrito(1, this.id_carrito, price, id_producto)
              .subscribe();
            this.router.navigate(['//carrito']);
          }
        },
        (err) => console.error(err)
      );
    }
  }
}
