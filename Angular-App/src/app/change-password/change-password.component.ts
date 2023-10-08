import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  constructor(private userService: UserService,
              public loginService: LoginService) {}

  changePassword(form: NgForm) {
    const value = form.value;
    this.userService.changePassword(value.email, value.oldPassword, value.newPassword);
  }

}
