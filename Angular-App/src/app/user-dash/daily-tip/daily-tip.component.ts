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
  tip: Tip = {category: '', text: ''};

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    const tips: Tip[] = this.loginService.user.teamId.tips;
    const index = Math.floor(Math.random()*tips.length);
    this.tip.category = tips[index].category;
    this.tip.text = tips[index].text;
  }
}
