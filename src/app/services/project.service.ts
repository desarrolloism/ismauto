import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public url = GLOBAL.url;
  public auth = GLOBAL.authorization;
  public token: any;

  constructor(private _http: HttpClient) { }

  createProject(
    token: any,
    endDate: string,
    projectName: string,
    description: string,
    departament: string,
    state: string,
    instituteId: string
  ) {
      
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = {
      "app": "/project",
      end_date: endDate,
      project_name: projectName,
      description: description,
      departament: departament,
      state: state,
      institute_id: instituteId
    }
    return this._http.post(`${this.url}/create_project`, data, { headers: headers });
  }


}
