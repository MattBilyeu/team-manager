import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Team } from '../models/team.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  loggedIn = new Subject<boolean>();
  user: User = new User('', '', '', '', '', new Team('', '', [], [], [], []), '', '');

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const loginData = { 
      email: email, 
      password: password };
    console.log(loginData);
    this.http.post('/login', loginData).subscribe(
      (foundUser: any) => {
        console.log(foundUser);
        let appUser
        if (foundUser.role === 'Admin') {
          appUser = new User(
            foundUser._id,
            foundUser.name,
            foundUser.email,
            foundUser.password,
            foundUser.role,
            new Team(
              '','',[],[],[],[]
            ),
            'Admin',
            'Admin'
          )
        } else {
          appUser = new User(
            foundUser._id,
            foundUser.name,
            foundUser.email,
            foundUser.password,
            foundUser.role,
            new Team(
              foundUser.teamId._id,
              foundUser.teamId.name,
              foundUser.teamId.updates,
              foundUser.teamId.tips,
              foundUser.teamId.escalations,
              foundUser.teamId.users
            ),
            foundUser.primaryTask,
            foundUser.floatTask
          );
        }
        this.user = appUser;
        this.loggedIn.next(true);
      },
      (error) => {
        console.log('An error was encountered.',error)
      }
    )
  }

  repopulateUser() {
    this.http.post('/user/repopulate-user', {}).subscribe(
      (foundUser: any) => {
        const appUser = new User(
          foundUser._id,
          foundUser.name,
          foundUser.email,
          foundUser.password,
          foundUser.role,
          new Team(
            foundUser.teamId._id,
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
      },
      (error) => {
        console.log('An error was encountered.',error)
      }
    )
  }
}
