import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  title = 'taller';
  // formGroup: FormGroup;
  // formSearch: FormGroup;
  // username: String;
  keyword = "name";
  data: any;

  onChangeSearch(event) {
    var languageCode = [
      { id: 1, name: "c++", link: "htpp:c++" },
      { id: 2, name: "Java", link: "htpp:Java" },
      { id: 3, name: "Angular", link: "htpp:Angular" },
      { id: 4, name: "JavaScript", link: "htpp:JavaScript" }
    ];
    this.data = languageCode;
  }

  selectEvent(event) {
    console.log("esto hago si pasa algo");
    // this.router.navigate(['/view'])
    
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {

        this.content = JSON.parse(err.error).message;
      }
    );
  }
}