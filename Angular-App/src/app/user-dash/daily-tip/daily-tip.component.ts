import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

interface Tip {
  category: string,
  text: string
}

@Component({
  selector: 'app-daily-tip',
  templateUrl: './daily-tip.component.html',
  styleUrls: ['./daily-tip.component.css']
})
export class DailyTipComponent implements OnInit {
  tip: Tip;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    const tips = this.loginService.user.teamId.tips;
    console.log(tips);
    const index = Math.floor(Math.random()*tips.length)-1;
    this.tip = tips[index]
  }
}
