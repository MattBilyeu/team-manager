import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

interface Update {
  category: string,
  text: string,
  acknowledged: string[]
}

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent implements OnInit {
  updates: Update[]

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.updates = this.loginService.user.teamId.updates;
  }
}
