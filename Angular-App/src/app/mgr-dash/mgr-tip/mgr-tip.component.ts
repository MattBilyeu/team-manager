import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';

interface response {
  message: string;
}

interface Tip {
  tipCategory: string,
  tipText: string
}

@Component({
  selector: 'app-mgr-tip',
  templateUrl: './mgr-tip.component.html',
  styleUrls: ['./mgr-tip.component.css']
})
export class MgrTipComponent implements OnInit {
  response: string = '';
  tips: Tip[];

  constructor(private teamService: TeamService,
              private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.user.teamId.tips.forEach((tip: Tip) => {
      this.tips.push(tip);
    })
  }

  addTip(form: NgForm) {
    this.teamService.addTip(form.value.category, form.value.text).subscribe((result: response) => {
      this.response = result.message;
    })
  }

  removeTip(tipIndex: number) {
    this.teamService.removeTip(tipIndex).subscribe((result: response) => {
      this.response = result.message;
    })
  }
}
