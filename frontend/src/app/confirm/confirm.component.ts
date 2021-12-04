import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //20211125
import { Router } from '@angular/router'; //20211125 se agrega RouterModule
import { ConfirmService } from '../services/confirm.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  mensaje!: String;
  constructor(
    private confirmService: ConfirmService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = String(this.route.snapshot.paramMap.get('token'));

    this.confirmService.confirmUser(token).subscribe(
      (res) => {
        if (res['message'] == 'Confirmado') {
          this.router.navigate(['//login']);
        } else {
          this.mensaje = res['message'];
        }
      },
      (err) => console.error(err)
    );
  }
}
