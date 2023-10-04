import { Component } from '@angular/core';
import { TeamService } from '../../services/team.service';

interface response {
  message: string;
}

@Component({
  selector: 'app-create-tip',
  templateUrl: './create-tip.component.html',
  styleUrls: ['./create-tip.component.css']
})
export class CreateTipComponent {
  response: string = '';

  constructor(private teamService: TeamService) {}

  addTip(category: string, text: string) {
    this.teamService.addTip(category, text).subscribe((result: response) => {
      this.response = result.message;
    })
  }
}
