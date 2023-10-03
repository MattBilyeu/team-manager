import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Team Manager';
  loggedIn: boolean = false;
  private subscription: Subscription;

  constructor(private router: Router,
              public loginService: LoginService) {}

  ngOnInit() {
    if (!this.loginService.loggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.routeToDash();
    };
    this.subscription = this.loginService.loggedIn.subscribe((result) => {
      if (result) {
        this.loggedIn = true;
        this.routeToDash();
      }
    })
  };

  routeToDash() {
    if (this.loginService.user.role === 'Admin') {
      this.router.navigate(['/admin-dash']);
    } else if (this.loginService.user.role === 'Manager') {
      this.router.navigate(['/mgr-dash'])
    } else {
      this.router.navigate(['/user-dash'])
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}