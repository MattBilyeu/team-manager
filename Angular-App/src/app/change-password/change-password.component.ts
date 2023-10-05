import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  constructor(private userService: UserService) {}

  changePassword(email: string, oldPassword: string, newPassword: string) {
    this.userService.changePassword(email, oldPassword, newPassword);
  }

}
