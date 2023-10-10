import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit {
  tips: {category: string, text: string}[];

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.tips = this.loginService.user.teamId.tips;
  }
}
