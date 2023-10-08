import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService: LoginService) {}

  login(form: NgForm) {
    this.loginService.login(form.value.email, form.value.password);
  }
}
