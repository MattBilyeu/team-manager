import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  @Input('user') user: User;
  @Output('userUpdated') userUpdated = new EventEmitter<any>();
  teams: Team[];

  constructor(private userService: UserService,
              private teamService: TeamService){}

  ngOnInit(){
    this.teamService.returnAllTeams().subscribe((result: Team[]) => {
      this.teams = result;
    })
  }

  updateUser(form: NgForm) {
    const value = form.value;
    this.userService.updateUser(value.name, value.newEmail, value.oldEmail, value.password, value.role, value.teamId)
      .subscribe(result => {
        this.userUpdated.emit('updated');
      })
  }
}
