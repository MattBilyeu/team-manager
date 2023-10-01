import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { Team } from './models/team.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loggedIn = false;
  user: User = new User('', '', '', '', new Team('', [], [], [], []), '', '');

  constructor() { }

  login(email: String, password: String) {
    // Login, then set the FoundUser object that is returned to be the User object above.
    this.loggedIn = true;
  }
}
