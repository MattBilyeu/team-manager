import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {
  teams: Team[];
  users: User[];
  selectedId: string;

  constructor(private userService: UserService,
              private teamService: TeamService,
              private loginService: LoginService) {}

  ngOnInit() {
    this.refreshData();
  }

  createUser(form: NgForm) {
    console.log('Create user function called within component.');
    const value = form.value;
    this.userService.createUser(value.name, value.email, value.password, value.role, value.teamId).subscribe(result => {
      console.log(result);
      this.refreshData();
    });
  }

  deleteUser(form: NgForm) {
    const email = form.value.email;
    this.userService.deleteUser(email)
      .subscribe(result => {
        this.refreshData();
      })
  }

  refreshData() {
    this.teamService.returnAllTeams().subscribe((teams: Team[]) => {
      this.teams = teams;
    });
    this.userService.returnAllUsers().subscribe((users: User[]) => {
      this.users = users;
    })
  }

  selectUser(userId) {
    if(this.selectedId !== userId) {
      this.selectedId = userId;
    } else {
      this.selectedId = ''
    }

  }
}
