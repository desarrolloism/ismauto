import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public url: string = GLOBAL.url;
  public auth: string = GLOBAL.authorization;

  constructor(private _http: HttpClient) { }

  login(username: string, password: string) {
    const user = {
      username,
      password
    };
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    })

    return this._http.post(`${this.url}/login`, user, { headers: headers });
  }

  //resetea contraseña
  resetPass(username: string, email: string) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });

    const data = {
      username,
      email
    }

    return this._http.post(`${this.url}/reset_password`,data, { headers: headers });
  }
}
