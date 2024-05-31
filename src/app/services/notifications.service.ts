import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public url: string;
  public auth: string;
  public token: any;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
    this.auth = GLOBAL.authorization;
    this.token = localStorage.getItem('token');
  }


  noti() {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': this.token
    });

    // console.log(this.token);
    // console.log(this.auth);

    return this._http.get(`${this.url}/notifications`, { headers: headers });
  }


  changePass(new_password: string, confirm_password: string, phone_number: string) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': this.token
    });

    const data = {
      new_password,
      confirm_password,
      phone_number
    }

    // console.log(data);
    return this._http.post(`${this.url}/change_password`, data, { headers: headers });

  }


}
