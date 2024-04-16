import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Form, NgForm } from '@angular/forms';

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


  all(token: any, page: number = 1, maint_status: string, search: string) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = {
      'page': page,
      'maint_status': maint_status,
      'search': search
    }

    return this._http.post(`${this.url}/maintenance`, data, { headers: headers });

  }

  create(token: any, form: any) {

    // console.log(form.institute_id);
    // console.log(token);

    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    // console.log(token);

    const data = {
      "app": "/maintenance",
      "institute_id": form.institute_id,
      "type_incident": form.type_incident,
      "site": form.site,
      "description_incident": form.description_incident,
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


  update(token: any, mainDetalle: any) {

    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = mainDetalle;
    // console.log(mainDetalle)

    return this._http.post(`${this.url}/maintenance/update`, data, { headers: headers });

  }


  uploadFile(token: any, file64: any, fileName: string, maintId: any,) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = {
      'file64': file64,
      'fileName': fileName,
      'maint_id': maintId
    }

    return this._http.post(`${this.url}/maintenance/upload`, data, { headers: headers });

  }

  updateScore(token: any, totalScore: any) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    return this._http.post(`${this.url}/maintenance/update-score`, totalScore, { headers: headers });
  }

}
