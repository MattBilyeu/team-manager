import { Component } from '@angular/core';
import { TeamService } from '../../services/team.service';

interface response {
  message: string;
}

@Component({
  selector: 'app-new-update',
  templateUrl: './new-update.component.html',
  styleUrls: ['./new-update.component.css']
})
export class NewUpdateComponent {
  response: string = '';
  // Use input to bind the update, this component will iterate for all updates

  constructor(private teamService: TeamService){}

  acknowledgeUpdate(updateIndex: number, userId: string) {
    this.teamService.acknowledgeUpdate(updateIndex, userId).subscribe((result: response) => {
      this.response = result.message;
    })
  }
}
