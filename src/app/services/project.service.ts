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
    instituteId: string,
    endDate: string,
    projectName: string,
    description: string,
    department: string,
    state: string,
  ) {
      
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = {
      "app": "/project",
      institute_id: instituteId,
      end_date: endDate,
      project_name: projectName,
      description: description,
      department,
      state: state,
    }
    return this._http.post(`${this.url}/create_project`, data, { headers: headers });
  }


}
