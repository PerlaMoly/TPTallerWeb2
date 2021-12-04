import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validate-token',
  templateUrl: './validate-token.component.html',
  styleUrls: ['./validate-token.component.css'],
})
export class ValidateTokenComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = String(this.route.snapshot.paramMap.get('token'));

    this.authService.validateAccount(token).subscribe(
      (res) => console.log(res),

      (err) => console.log(err)
    );
  }
}
