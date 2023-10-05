import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

interface response {
  message: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  response: string = '';
  users: User[];

  constructor(private teamService: TeamService,
              private userService: UserService,
              private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.user.teamId.users.forEach(userId => {
      this.userService.returnUserById(userId)
        .subscribe((user: User) => {
          this.users.push(user);
        })
    })
  }

  createUser(name: string, email: string, password: string, role: string) {
    const teamId = this.loginService.user.teamId._id;
    this.userService.createUser(name, email, password, role, teamId)
      .subscribe(result => {
        this.loginService.repopulateUser();
      });
  }

  assignTasks(email: string, primaryTask: string, floatTask: string) {
    this.userService.assignTasks(email, primaryTask, floatTask)
    .subscribe(result => {
      this.loginService.repopulateUser();
    });
  }

  deleteUser(email: string) {
    this.userService.deleteUser(email)
    .subscribe(result => {
      this.loginService.repopulateUser();
    });
  }
}