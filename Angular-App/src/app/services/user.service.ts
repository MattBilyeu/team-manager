import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(name: string, email: string, password: string, role: string, teamId: string) {

  }

  changePassword(email: string, oldPassword: string, newPassword: string) {

  }

  assignTasks(email: string, primaryTask: string, floatTask: string) {

  }

  deleteUser(email: string) {

  }

  updateUser(name: string, newEmail: string, oldEmail: string, password: string, role: string, teamId: string) {

  }

  returnUserById(userId: string) {
    // Returns everything but the password for the user with that Id.
  }

  repopulateUser() {
    //Posts the request and then re-assigns the user in dataService
  }
}
