import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  title = 'taller';
  // formGroup: FormGroup;
  // formSearch: FormGroup;
  // username: String;
  keyword = "name";
  data: any;
  

  onChangeSearch(_event: any) {
    var languageCode = [
      { id: 1, name: "c++", link: "htpp:c++" },
      { id: 2, name: "Java", link: "htpp:Java" },
      { id: 3, name: "Angular", link: "htpp:Angular" },
      { id: 4, name: "JavaScript", link: "htpp:JavaScript" }
    ];
    this.data = languageCode;
  }

  selectEvent(_event: any) {
    console.log("esto hago si pasa algo");
    this.router.navigate(['/view'])
    
  }

  constructor(protected router:Router, private formBuilder: FormBuilder, protected httpClient: HttpClient) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // ngOnInit(): void {
  //   console.log('Iniciando appComponent');
  //   this.formGroup = this.formBuilder.group({
  //     username: new FormControl('',  Validators.required),
  //   });
  //   this.formSearch = this.formBuilder.group({
  //     username: new FormControl('',  Validators.required),
  //     email: new FormControl('',  Validators.required),
  //     password: new FormControl('',  Validators.required),
  //   });
  // }
}
