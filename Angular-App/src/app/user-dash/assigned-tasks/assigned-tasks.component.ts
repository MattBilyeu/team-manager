import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-assigned-tasks',
  templateUrl: './assigned-tasks.component.html',
  styleUrls: ['./assigned-tasks.component.css']
})
export class AssignedTasksComponent implements OnInit {
  primaryTask: string;
  floatTask: string

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.primaryTask = this.loginService.user.primaryTask;
    this.floatTask = this.loginService.user.floatTask;
  }
}
