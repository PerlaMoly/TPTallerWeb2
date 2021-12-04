import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ProfileComponent } from './profile/profile.component';
import { ListCoursesComponent } from './courses/list-courses/list-courses.component';
import { ShowCourseComponent } from './show-course/show-course.component';
import { ConfirmComponent } from './confirm/confirm.component';

const routes: Routes = [
  { path: 'carrito', component: CarritoComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'category/:category', component: ListCoursesComponent }, //20211125
    ],
  },
  { path: 'ordenes', component: OrdenesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'courses', component: ListCoursesComponent },
  { path: 'courses/:id', component: ShowCourseComponent },
  { path: 'courses/show/:id', component: ListCoursesComponent },
  { path: 'courses/filter/:name', component: ListCoursesComponent }, //20211125
  { path: 'confirm/:token', component: ConfirmComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
