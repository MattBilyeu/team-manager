import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  response: string = '';
  users: User[] = [];

  constructor(private userService: UserService,
              private loginService: LoginService) {}

  ngOnInit() {
    this.updateData();
  }

  createUser(form: NgForm) {
    const value = form.value;
    const teamId = this.loginService.user.teamId._id;
    this.userService.createUser(value.name, value.email, value.password, value.role, teamId)
      .subscribe(result => {
        this.loginService.repopulateUser();
        this.updateData();
      });
  }

  assignTasks(form: NgForm) {
    const value = form.value;
    console.log('assignTasks component function value', value);
    this.userService.assignTasks(value.email, value.primaryTask, value.floatTask)
    .subscribe(result => {
      this.loginService.repopulateUser();
      this.updateData();
    });
  }

  deleteUser(email: string) {
    this.userService.deleteUser(email)
    .subscribe(result => {
      this.loginService.repopulateUser();
      this.updateData();
    });
  }

  togglePeerReview(userId: string) {
    this.userService.togglePeerReview(userId).subscribe(result => {
      this.loginService.repopulateUser();
      this.updateData();
    })
  }

  updateData() {
    this.users = [];
    this.loginService.user.teamId.users.forEach(userId => {
      this.userService.returnUserById(userId)
        .subscribe((user: User) => {
          const newUser = new User(
            user._id,
            user.name,
            user.email,
            'redacted',
            user.role,
            user.teamId,
            user.primaryTask,
            user.floatTask
          );
          this.users.push(newUser);
        })
    });
  }
}