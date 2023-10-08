import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Escalation } from 'src/app/models/escalation.model';
import { LoginService } from 'src/app/services/login.service';
import { TeamService } from 'src/app/services/team.service';

interface response {
  message: string;
}

interface packagedEscalation {
  escalation: Escalation,
  index: number
}

@Component({
  selector: 'app-escalation-detail',
  templateUrl: './escalation-detail.component.html',
  styleUrls: ['./escalation-detail.component.css']
})
export class EscalationDetailComponent implements OnInit {
  response: string;
  @Input('index') escalationIndex: number;
  escalation: Escalation;

  constructor(private teamService: TeamService,
              private loginService: LoginService,
              private route: ActivatedRoute){}

  ngOnInit() {
    this.escalation = this.loginService.user.teamId.escalations[this.escalationIndex]
  }

  advanceEscalation(note: string) {
    this.teamService.advanceEscalation(this.escalationIndex, note).subscribe((result: response) => {
      this.response = result.message;
    })
  }

  removeEscalation() {
    this.teamService.removeEscalation(this.escalationIndex).subscribe((result: response) => {
      this.response = result.message;
    })
  }
}
