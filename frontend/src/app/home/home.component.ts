import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; //20211125 se agrega RouterModule
import { CourseService } from '../services/course.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';



const API_URL = 'http://localhost:3000/';
var extraValue ={id: -1, name: ""};

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
 
  ngOnInit() { }
  content?: string;
  title = 'taller';
  // formGroup: FormGroup;
  // formSearch: FormGroup;
  // username: String;
  keyword = "name";
  data:any;

 
  constructor(
      private http: HttpClient,
      private route: Router,
      private courseService: CourseService
      ) { }

  onChangeSearch(event) {
      this.http.get(API_URL + 'home/getListCursos/' + event,httpOptions).subscribe(responseCurso =>{  
      extraValue.name = event;
      //reformateo Json para agregar el valor de busqueda
      var responsetoString = JSON.stringify(responseCurso);
      responsetoString = responsetoString.substring(1,responsetoString.length-1);
      var responseFinal = "[" + JSON.stringify(extraValue) + "," + responsetoString + "]";
      responseFinal = JSON.parse(responseFinal);
      this.data = responseFinal;
    });

    return this.data;
  }


  selectEvent(event): void {
    console.log(event);
    if(event.id == "-1")
    {
      this.route.navigate(['//courses/filter/' + event.name]);
    }
    else
    {      
      this.route.navigate(['//courses/show/' + event.id]);
    }    
  }


}
