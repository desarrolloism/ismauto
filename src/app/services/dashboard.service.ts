import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public url = GLOBAL.url
  public auth = GLOBAL.authorization
  public token: any

  constructor(private _http: HttpClient) { }

  dashborad(token: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });

    const data = {}

    return this._http.post(`${this.url}/dashboard`, data, { headers: headers });
  }

}
