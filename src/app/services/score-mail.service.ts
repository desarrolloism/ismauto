import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class ScoreMailService {

  public url: string = GLOBAL.url;
  public auth: string = GLOBAL.authorization;
  constructor(private _http: HttpClient) { }


  sendEmail(ScoreUrl: string, maintenanceId: string, token: any) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
  });
  return this._http.get(`${this.url}/cases/score/${ScoreUrl}/${maintenanceId}`, { headers: headers });
  }
}
