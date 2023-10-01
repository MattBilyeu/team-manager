import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-App';

  constructor(private router: Router,
              private dataService: DataService) {}

  ngOnInit() {
    if (!this.dataService.loggedIn) {
      this.router.navigate(['/login']);
    };
    if (this.dataService.user.role === 'Admin') {
      this.router.navigate(['/admin-dash']);
    }
  }
}