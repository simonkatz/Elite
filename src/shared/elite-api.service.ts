import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliteApi {

  private baseUrl = 'https://elite-2222.firebaseio.com/';
  currentTournament: any = {};
  constructor(private http: HttpClient) { }

  getTournaments() {
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`)
          .subscribe(response => resolve(response));
    });
  }

  getTournamentData(id) : Observable<any> {
    return this.http.get(`${this.baseUrl}/tournaments-data/${id}.json`)
          .map((response: Response) => {
            this.currentTournament = response;
            return this.currentTournament;
          });
  }

  getCurrentTournament() {
    return this.currentTournament;
  }
}
