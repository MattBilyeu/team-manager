import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { LoginService } from 'src/app/services/login.service';

interface Update {
  category: string, 
  text: string, 
  acknowledged: string[]
}

interface packagedUpdate {
  update: Update,
  index: number
}

@Component({
  selector: 'app-new-update',
  templateUrl: './new-update.component.html',
  styleUrls: ['./new-update.component.css']
})
export class NewUpdateComponent implements OnInit {
  response: string = '';
  packagedUpdates: packagedUpdate[] = [];

  constructor(private teamService: TeamService,
              private loginService: LoginService){}

  ngOnInit() {
    const userId = this.loginService.user._id;
    this.loginService.user.teamId.updates.forEach((update: Update, index) => {
      const acknowledged = update.acknowledged.indexOf(userId);
      if (acknowledged === -1) {
        this.packagedUpdates.push({update, index})
      }
    });
  }

  acknowledgeUpdate(index: number, packageIndex: number) {
    this.teamService.acknowledgeUpdate(index, this.loginService.user._id).subscribe(result => {
      console.log(result);
    });
    this.packagedUpdates.splice(packageIndex, 1);
  }
}
