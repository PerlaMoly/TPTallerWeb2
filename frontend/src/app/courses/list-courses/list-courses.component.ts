import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces/Course';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router'; //20211125
import { CarritoService } from '../../services/carrito.service'; //20211125
import { Router } from '@angular/router'; //20211125 se agrega RouterModule
import { TokenStorageService } from '../../services/token-storage.service'; //20211125

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css'],
})
export class ListCoursesComponent implements OnInit {
  courses!: Course[];
  id_carrito : any;
  id_usuario: any;
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router, //20211125
    private carritoService: CarritoService, //20211125
    private tokenStorage: TokenStorageService //20211125
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((parameterIn: any) => {
      //20211125
      const { params } = parameterIn;
      if (params.category) {
        //20211125
        this.courseService.getFilterCoursesCategory(params.category).subscribe(
          (res) => (this.courses = res),
          (err) => console.log(err)
        );
      } else if (params.name) {
        //20211125
        this.courseService.getFilterCourses(params.name).subscribe(
          (res) => (this.courses = res),
          (err) => console.log(err)
        );
      } //20211125
      else {
        this.courseService.getCourses().subscribe(
          (res) => (this.courses = res),
          (err) => console.log(err)
        );
      }
    });
  }

  getCourses() {
    this.courseService.getCourses().subscribe(
      (res) => console.log(res),

      (err) => console.log(err)
    );
  }

  agregarAlCarrito(price: number, id_producto: number) {
    //20211125
    this.id_usuario = this.tokenStorage.getUser().id; //obtengo id del usuario logueado;
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
