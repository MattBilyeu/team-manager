import { Component } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

interface response {
  message: string;
}

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateComponent {
  response: string = '';

  constructor(private teamService: TeamService,
              private userService: UserService) {}

  addUpdate(category: string, text: string) {
    this.teamService.addUpdate(category, text).subscribe((result: response) => {
      this.response = result.message;
    })
  }
}
