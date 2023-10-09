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

  constructor(private teamService: TeamService) {}
}
