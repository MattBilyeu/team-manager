import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

interface response {
  message: string;
}


@Component({
  selector: 'app-team-admin',
  templateUrl: './team-admin.component.html',
  styleUrls: ['./team-admin.component.css']
})
export class TeamAdminComponent implements OnInit {
  response: string = '';
  teams: Team[];
  users: User[];

  constructor(private teamService: TeamService,
              private userService: UserService) {}

  ngOnInit(){
    this.teamService.returnAllTeams()
      .subscribe((result: Team[]) => {
        this.teams = result;
      })
    this.userService.returnAllUsers()
      .subscribe((result: User[]) => {
        this.users = result;
      })
  }

  createTeam(form: NgForm) {
    this.teamService.createTeam(form.value.name).subscribe((result: response) => {
      this.response = result.message;
    })
  }

  assignUser(form: NgForm) {
    const value = form.value;
    this.teamService.assignUser(value.userId, value.teamId).subscribe((result: response) => {
      this.response = result.message;
    })
  }

  confirmDeleteTeam(form: NgForm) {
    const confirmation = confirm('Are you sure you want to delete this team?  Deletions are irreversible.')
    if (confirmation) {
      this.deleteTeam(form.value.teamId);
    }
  }

  deleteTeam(teamId: string) {
    this.teamService.deleteTeam(teamId).subscribe((result: response) => {
      this.response = result.message;
    })
  }
}