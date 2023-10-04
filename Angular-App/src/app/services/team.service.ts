import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  createTeam(name: string) {
    const body = {name: name};
    return this.http.post('/team/create-team', body);
  }

  assignUser(userId: string, teamId: string) {
    const body = {userId: userId, teamId: teamId};
    return this.http.post('/team/assign-user', body);
  }

  addUpdate(category: string, text: string) {
    const body = {category: category, text: text};
    return this.http.post('/team/add-update', body);
  } // Future improvement - add rich text

  acknowledgeUpdate(updateIndex: number, userId: string) {
    const body = {updateIndex: updateIndex, userId: userId};
    return this.http.post('/team/acknowledge-update', body);
  }

  removeUpdate(updateIndex: number) {
    const body = {updateIndex: updateIndex};
    return this.http.post('/team/remove-update', body);
  }

  addTip(category: string, text: string) {
    const body = {category: category, text: text};
    return this.http.post('/team/add-tip', body);
  }

  removeTip(tipIndex: number) {
    const body = {tipIndex: tipIndex};
    return this.http.post('/team/remove-tip', body);
  }

  addEscalation(title: string, note: string, ownerId: string) {
    const body = {title: title, note: note, ownerId: ownerId};
    return this.http.post('/team/add-escalation', body);
  }

  advanceEscalation(escalationIndex: number, note: string) {
    const body = {escalationIndex: escalationIndex, note: note};
    return this.http.post('/team/advance-escalation', body);
  }
  removeEscalation(escalationIndex: number) {
    const body = {escalationIndex: escalationIndex};
    return this.http.post('/team/remove-escalation', body);
  }

  deleteTeam(teamId: string) {
    const body = {teamId: teamId};
    return this.http.post('/team/delete-team', body);
  }
}
