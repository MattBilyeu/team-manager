import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn = false;
  user: User = new User('', '', '', '', new Team('', [], [], [], []), '', '');

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const loginData = { email, password };
    this.http.post('/login', loginData).subscribe(
      (foundUser: any) => {
        const appUser = new User(
          foundUser.name,
          foundUser.email,
          foundUser.password,
          foundUser.role,
          new Team(
            foundUser.teamId.name,
            foundUser.teamId.updates,
            foundUser.teamId.tips,
            foundUser.teamId.escalations,
            foundUser.teamId.users
          ),
          foundUser.primaryTask,
          foundUser.floatTask
        );
        this.user = appUser;
        this.loggedIn = true;
      },
      (error) => {
        console.log('An error was encountered.',error)
      }
    )
  }
}
