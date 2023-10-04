import { Component } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

interface response {
  message: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  response: string = '';

  constructor(private teamService: TeamService,
              private userService: UserService) {}


}
