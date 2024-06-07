import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ScholarshipsService {

  public url: string = GLOBAL.url;
  public auth: string = GLOBAL.authorization;


  constructor(private _http: HttpClient) { }

  getCi(cedula: string) {
    const data = {
      cedula,
    }
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
    });
    console.log(this.auth);
    return this._http.post(`${this.url}/scholarships`, data, { headers: headers });
  }
}
