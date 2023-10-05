import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent {

  constructor(private userService: UserService,
              private loginService: LoginService) {}

  createUser(name: string, email: string, password: string, role: string, teamId: string) {
    this.userService.createUser(name, email, password, role, teamId);
    this.loginService.repopulateUser();
  } // Will need to add a function that gets all of the teams with their names and ids.  TeamId would then be selected from a dropdown.

  deleteUser(email: string) {
    this.userService.deleteUser(email)
      .subscribe(result => {
        //Admin repopulate function, teams/users
      })
  }

  updateUser(name: string, newEmail: string, oldEmail: string, password: string, role: string, teamId: string) {
    this.userService.updateUser(name, newEmail, oldEmail, password, role, teamId)
      .subscribe(result => {
        //Admin repopulate function, teams/users
      })
  }
}
