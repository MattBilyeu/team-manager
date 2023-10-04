import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(name: string, email: string, password: string, role: string, teamId: string) {
    const body = {name: name, email: email, password: password, role: role, teamId: teamId};
    return this.http.post('/user/create-user', body);
  }

  changePassword(email: string, oldPassword: string, newPassword: string) {
    const body = {email: email, oldPassword: oldPassword, newPassword: newPassword};
    return this.http.post('/user/change-password', body);
  }

  assignTasks(email: string, primaryTask: string, floatTask: string) {
    const body = {email: email, primaryTask: primaryTask, floatTask: floatTask};
    return this.http.post('/user/assign-tasks', body);
  }

  deleteUser(email: string) {
    const body = {email: email};
    return this.http.post('/user/delete-user', body);
  }

  updateUser(name: string, newEmail: string, oldEmail: string, password: string, role: string, teamId: string) {
    const body = {name: name, newEmail: newEmail, oldEmail: oldEmail, password: password, role: role, teamId: teamId};
    return this.http.post('/user/update-user', body);
  }

  returnUserById(userId: string) {
    const body = {userId: userId};
    return this.http.post('/user/find-user', body);
    // Returns everything but the password for the user with that Id.
  }
}
