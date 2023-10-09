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
      update.acknowledged.forEach(async id => { // Won't work, is only going to run this for the id's within the acknowledged list.  I need to run the forEach on the full user's list.
        if(this.loginService.user.teamId.users.findIndex(userId => userId === id) === -1){
          const name = await this.userService.returnUserById(id).subscribe((user: User) => user.name);
          notAcknowledged.push(name);
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
