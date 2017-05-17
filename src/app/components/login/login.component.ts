import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: any;

  constructor(private authService: AuthService) {
    this.authService.onAuthStateChanged.subscribe((user: any) => {
      console.log(user);
      this.user = user;
    });
  }

  ngOnInit() {
  }

}
