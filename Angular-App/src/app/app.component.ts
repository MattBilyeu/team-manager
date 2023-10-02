import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Team Manager';

  constructor(private router: Router,
              public loginService: LoginService) {}

  ngOnInit() {
    if (!this.loginService.loggedIn) {
      this.router.navigate(['/login']);
    };
    if (this.loginService.user.role === 'Admin') {
      this.router.navigate(['/admin-dash']);
    } else if (this.loginService.user.role === 'Manager') {
      this.router.navigate(['/mgr-dash'])
    } else {
      this.router.navigate(['/user-dash'])
    }
  }
}