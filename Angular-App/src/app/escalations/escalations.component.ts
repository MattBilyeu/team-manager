import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { TeamService } from '../services/team.service';
import { Escalation } from '../models/escalation.model';
import { NgForm } from '@angular/forms';

interface response {
  message: string;
}

interface packagedEscalation {
  escalation: Escalation,
  index: number
}

@Component({
  selector: 'app-escalations',
  templateUrl: './escalations.component.html',
  styleUrls: ['./escalations.component.css']
})
export class EscalationsComponent implements OnInit {
  escalations: packagedEscalation[] = [];
  response: string;
  user: User;
  selectedEscalationIndex: number;


  constructor(private loginService: LoginService,
              private userService: UserService,
              private teamService: TeamService) {}

  ngOnInit() {
    this.user = this.loginService.user;
    const team = this.loginService.user.teamId;
    team.escalations.forEach(async (e: Escalation, index: number) => {
      const packagedEscalation = {
        escalation: e,
        index: index
      };
      if (
          packagedEscalation.escalation.stage === 'Peer Review' && this.user.role === 'Peer Review' || 
          packagedEscalation.escalation.stage === 'Member' && packagedEscalation.escalation.owner === this.user._id ||
          packagedEscalation.escalation.stage === 'Manager' && this.user.role === 'Manager'
        ) {
        await this.userService.returnUserById(e.owner).subscribe((owner: User) => {packagedEscalation.escalation.owner = owner.name});
        this.escalations.push(packagedEscalation);
      }
    })
  }

  addEscalation(form: NgForm) {
    this.teamService.addEscalation(form.value.title, form.value.note, this.loginService.user._id).subscribe((result: response) => {
      this.response = result.message;
    })
  }

  selectEscalation(index: number) {
    this.selectedEscalationIndex = index;
  }
}