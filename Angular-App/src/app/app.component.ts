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
    this.router.navigate(['/login']);
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

  routeToTips() {
    this.router.navigate(['/tips'])
  }

  routeToUpdates() {
    this.router.navigate(['/updates'])
  }

  routeToChangePassword() {
    this.router.navigate(['/change-password'])
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logOut() {
    this.loginService.user = null;
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
}