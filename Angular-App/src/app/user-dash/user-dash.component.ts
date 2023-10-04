import { Component } from '@angular/core';
import { TeamService } from '../services/team.service';

interface response {
  message: string;
}

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent {
  response: string = '';

  constructor(private teamService: TeamService) {}

  addEscalation(title: string, note: string, ownerId: string) {
    this.teamService.addEscalation(title, note, ownerId).subscribe((result: response) => {
      this.response = result.message;
    })
  }

  advanceEscalation(escalationIndex: number, note: string) {
    this.teamService.advanceEscalation(escalationIndex, note).subscribe((result: response) => {
      this.response = result.message;
    })
  }

  removeEscalation(escalationIndex: number) {
    this.teamService.removeEscalation(escalationIndex).subscribe((result: response) => {
      this.response = result.message;
    })
  }
}
