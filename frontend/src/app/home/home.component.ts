import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:3000/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  ngOnInit() {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  }
  content?: string;
  title = 'taller';
  // formGroup: FormGroup;
  // formSearch: FormGroup;
  // username: String;
  keyword = "email";
  data: any;

 
  constructor(private http: HttpClient) { }

  onChangeSearch(event) {
    this.http.get('http://localhost:3000/home/getListCursos/' + event,httpOptions).subscribe(responseCurso =>{
      this.data =  responseCurso;
    });
    console.log(this.data);
    return this.data;

  
  }


  selectEvent(event): void {
    console.log("esto hago si pasa algo");
    // this.router.navigate(['/view'])
    
  }


}
