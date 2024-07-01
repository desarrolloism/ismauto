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

  //obtiene tickets

  getTickets(token: string) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = {}

    return this._http.post(`${this.url}/get_projects`, data, { headers: headers });
  }


  //actualiza estado del ticket

  updateProject(token: any,
    id: number,
    endDate: string,
    projectName: string,
    description: string,
    department: string,
    state: string
  ) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = {
      id,
      end_date: endDate,
      project_name: projectName,
      description: description,
      department,
      state: state
    }

    return this._http.post(`${this.url}/update_project`, data, { headers: headers });
  }

  //obtiene detalles del proyecto
  getProjectDetail(token: any, projectId: number) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });
    const data = {
      project_id: projectId
    }
    return this._http.post(`${this.url}/projects_detail`, data, { headers: headers });
  }


  //crea tareas

  createTask(
    token: any,
    projectId: number,
    developerId: number,
    nameTaks: string,
    descriptionTask: string,
    assignamentDate: string,
    endDate: string,
    state: string,
    observation: string
  ) {

    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = {
      project_id: projectId,
      developer_id: developerId,
      name_task: nameTaks,
      description_task: descriptionTask,
      assignament_date: assignamentDate,
      end_date: endDate,
      state: state,
      observation: observation
    }

    return this._http.post(`${this.url}/create_task`, data, { headers: headers });

  }

  //actualiza la tarea  

  updateTask(
    token: any,
    Id: number,
    nameTaks: string,
    descriptionTask: string,
    assignamentDate: string,
    endDate: string,
    state: string,
    observation: string
  ) {

    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = {
      id: Id,
      name_task: nameTaks,
      description_task: descriptionTask,
      assignament_date: assignamentDate,
      end_date: endDate,
      state: state,
      observation: observation
    }

    return this._http.post(`${this.url}/update_task`, data, { headers: headers });
  }
  //consulta las tareas de cada caso

  getTasks(
    token: any,
    projectId: number
  ) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });
    const data = {
      project_id: projectId
    }
    return this._http.post(`${this.url}/task_asigned`, data, { headers: headers });
  }

}
