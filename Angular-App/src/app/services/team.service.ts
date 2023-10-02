import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  createTeam(name: string) {

  }

  assignUser(userId: string, teamId: string) {

  }

  addUpdate(category: string, text: string) {

  } // Future improvement - add rich text

  acknowledgeUpdate(updateIndex: number, userId: string) {

  }

  removeUpdate(updateIndex: number) {

  }

  addTip(category: string, text: string) {

  }

  removeTip(tipIndex: number) {

  }

  addEscalation(title: string, note: string, ownerId: string) {

  }

  advanceEscalation(escalationIndex: number, note: string) {

  }
  removeEscalation(escalationIndex: number) {

  }

  deleteTeam(teamId: string) {

  }
}
