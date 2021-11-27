import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces/Course';
import { CourseService } from '../services/course.service';
import { CarritoService } from '../services/carrito.service';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.courseService.getCourse(id).subscribe(
      (res) => (this.course = res),

      (err) => console.log(err)
    );
  }

  dameCarrito(id_usuario: number) {
    this.carritoService.buscoCarritoUsuario(id_usuario).subscribe(
      (res) => {
        this.carritoService.carrito = res;
        if (res == null) {
          this.carritoService.crearCarrito(id_usuario).subscribe(
            (res) => {},
            (err) => console.error(err)
          );
        }

        this.carritoService.dameMiCarrito(id_usuario).subscribe(
          (res) => {
            this.carritoService.carrito = res;
            this.id_carrito = 56;
            this.dameDetalleDelCarrito();
          },
          (err) => console.error(err)
        );
      },
      (err) => console.error(err)
    );
  }

  dameDetalleDelCarrito() {
    const idCarrito = this.id_carrito;
    this.carritoService.dameDetalleDelCarrito(idCarrito).subscribe(
      (res) => {
        this.carritoService.detalle = res;
      },
      (err) => console.error(err)
    );
  }

  agregarAlCarrito(id_producto: number): void {
    if (this.id_carrito == 0) {
      this.dameCarrito(this.id_usuario);
    } else {
      /*this.courseService.getCourse(id_producto).subscribe(
      res =>{
        this.courseService.course = res;
        const precio = */
      const precio = 300;

      this.carritoService
        .agregarAlCarrito(this.cantidad, this.id_carrito, precio, id_producto)
        .subscribe(
          (res) => {
            this.dameDetalleDelCarrito();
          },
          (err) => console.error(err)
        );

      /*  },
    err =>console.error(err)
  );*/
    }
  }
}
