import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

interface escalation {
  title: string,
  note: string[],
  ownerId: string
}

@Component({
  selector: 'app-escalations',
  templateUrl: './escalations.component.html',
  styleUrls: ['./escalations.component.css']
})
export class EscalationsComponent implements OnInit {
  escalations: {title: string, note: string, owner: string}[];


  constructor(private loginService: LoginService,
              private userService: UserService) {}

  ngOnInit() {
    const team = this.loginService.user.teamId;
    team.escalations.forEach(async (e: escalation) => {
      const escalation = {
        title: e.title,
        note: e.note[e.note.length - 1],
        owner: ''
      };
      await this.userService.returnUserById(e.ownerId).subscribe((owner: User) => {escalation.owner = owner.name});
      this.escalations.push(escalation);
    })
  }
}