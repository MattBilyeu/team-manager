import { Component } from '@angular/core';
import { TeamService } from '../services/team.service';

interface response {
  message: string;
}

@Component({
  selector: 'app-mgr-dash',
  templateUrl: './mgr-dash.component.html',
  styleUrls: ['./mgr-dash.component.css']
})
export class MgrDashComponent {
  response: string = '';

  constructor(private teamService: TeamService) {}

  removeUpdate(updateIndex: number) {
    this.teamService.removeUpdate(updateIndex).subscribe((result: response) => {
      this.response = result.message;
    })
  }

  removeTip(tipIndex: number) {
    this.teamService.removeTip(tipIndex).subscribe((result: response) => {
      this.response = result.message;
    })
  }

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
}
