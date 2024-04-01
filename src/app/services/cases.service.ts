import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  public url: string;
  public auth: string;
  public token: any;
  
  constructor( private _http: HttpClient ) {
    this.url = GLOBAL.url;
    this.auth = GLOBAL.authorization;
    this.token = localStorage.getItem('token');  
  }

  casesAll( token:any ){
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    return this._http.get(`${this.url}/cases/my-panel`, {headers: headers});
  }

}
