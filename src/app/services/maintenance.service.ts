import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  public url: string;
  public auth: string;
  public token: any;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
    this.auth = GLOBAL.authorization;
  }


  all(token: any, page: number = 1) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = {
      'page': page
    }

    return this._http.post(`${this.url}/maintenance`, data, { headers: headers });

  }

  create(token: any, form: NgForm) {

    console.log(form.value);

    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = {
      "app": "/maintenance",
      "institute_id": form.value.institute_id,
      "type_incident": form.value.type_incident,
      "site": form.value.site,
      "description_incident": form.value.description_incident,
    }

    return this._http.post(`${this.url}/maintenance/create`, data, { headers: headers });
  }


  detail(token: any, maintId: any) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = {
      'maint_id': maintId
    }

    return this._http.post(`${this.url}/maintenance/detail`, data, { headers: headers });
  }


  update(token: any, form: NgForm) {

    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = form.value;
    
    return this._http.post(`${this.url}/maintenance/update`, data, { headers: headers });

  }


  uploadFile(token: any, file64: any, fileName: string){
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = {
      'file64': file64,
      'fileName': fileName
    }

    return this._http.post(`${this.url}/maintenance/upload`, data, { headers: headers });

  }

}
