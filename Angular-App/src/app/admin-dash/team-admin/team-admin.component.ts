import { Component } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

interface response {
  message: string;
}


@Component({
  selector: 'app-team-admin',
  templateUrl: './team-admin.component.html',
  styleUrls: ['./team-admin.component.css']
})
export class TeamAdminComponent {
  response: string = '';

  constructor(private teamService: TeamService) {}

  createTeam(name: string) {
    this.teamService.createTeam(name).subscribe((result: response) => {
      this.response = result.message;
    })
  }

  assignUser(userId: string, teamId: string) {
    this.teamService.assignUser(userId, teamId).subscribe((result: response) => {
      this.response = result.message;
    })
  }

  deleteTeam(teamId: string) {
    this.teamService.deleteTeam(teamId).subscribe((result: response) => {
      this.response = result.message;
    })
  }
}
