import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

interface response {
  message: string;
}

interface Update {
  category: string,
  text: string,
  acknowledged: string[]
}

@Component({
  selector: 'app-mgr-update',
  templateUrl: './mgr-update.component.html',
  styleUrls: ['./mgr-update.component.css']
})
export class MgrUpdateComponent implements OnInit {
  response: string = '';
  packagedUpdates: {update: Update, notAcknowledged: string[]}[] = [];

  constructor(private teamService: TeamService,
              private userService: UserService,
              private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.user.teamId.updates.forEach((update: Update) => {
      const notAcknowledged = [];
      this.loginService.user.teamId.users.forEach(async (userId: string) => {
        if (update.acknowledged.findIndex((id) => id === userId) === -1) {
          const userName = await this.userService.returnUserById(userId).subscribe((user: User) => {return user.name});
          notAcknowledged.push(userName)
        }
      });
      const packagedUpdate = {update, notAcknowledged};
      this.packagedUpdates.push(packagedUpdate);
    })
  }

  addUpdate(form: NgForm) {
    this.teamService.addUpdate(form.value.category, form.value.text).subscribe((result: response) => {
      this.response = result.message;
    })
  }

  removeUpdate(updateIndex: number) {
    this.teamService.removeUpdate(updateIndex).subscribe((result: response) => {
      this.response = result.message;
    })
  }
}
