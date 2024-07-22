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


  //elimina proyectos
  deleteProject(token: any, projectId: number) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = {
      project_id: projectId
    }

    return this._http.post(`${this.url}/delete_project`, data, { headers: headers });
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
    observation: string,
    responsibleCounterpart: string,
    project_phases: string
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
      observation: observation,
      responsible_counterpart: responsibleCounterpart,
      project_phases: project_phases
    }

    return this._http.post(`${this.url}/create_task`, data, { headers: headers });

  }

  //actualiza la tarea  

  updateTask(
    token: any,
    Id: number,
    developerId: number,
    nameTaks: string,
    descriptionTask: string,
    assignamentDate: string,
    endDate: string,
    state: string,
    observation: string,
    responsibleCounterpart: string,
    project_phases: string
  ) {

    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = {
      id: Id,
      developer_id: developerId,
      name_task: nameTaks,
      description_task: descriptionTask,
      assignament_date: assignamentDate,
      end_date: endDate,
      state: state,
      observation: observation,
      responsible_counterpart: responsibleCounterpart,
      project_phases: project_phases
    }

    return this._http.post(`${this.url}/update_task`, data, { headers: headers });
  }

  //eliminar tareas

  deleteTask(token: any, taskId: number) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });
    const data = {
      task_id: taskId
    }
    return this._http.post(`${this.url}/delete_task_id`, data, { headers: headers });
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

  //consulta tareas de cada campos front y back

  developerTasks(
    token: any,
    projectId: number,
    developerId: number
  ) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = {
      project_id: projectId,
      developer_id: developerId
    }
    return this._http.post(`${this.url}/developer_task`, data, { headers: headers });
  }

  //crea firmas para usuarios

  confirmationSignature(
    token: any,
    projectId: number,
    userId: number,
    isAcepted: boolean,
    dateAccepted: string
  ) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });
    const data = {
      project_id: projectId,
      user_id: userId,
      is_acepted: isAcepted,
      date_accepted: dateAccepted
    }
    return this._http.post(`${this.url}/confirmation_signature`, data, { headers: headers });
  }

  //obtiene usuarios
  getUsers(token: any) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });
    const data = {}
    return this._http.post(`${this.url}/user_list`, data, { headers: headers });
  }


  //agrega firmas para usuarios

  addSignature(
    token: any,
    projectId: number,
    userId: number,
    isAcepted: boolean,
    dateAccepted: string
  ) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });
    const data = {
      project_id: projectId,
      user_id: userId,
      is_accepted: isAcepted,
      date_accepted: dateAccepted
    }
    return this._http.post(`${this.url}/create_signature`, data, { headers: headers });
  }

  getSignatures(
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
    return this._http.post(`${this.url}/show_signature`, data, { headers: headers });
  }


  aproveSignature(
    token: any,
    projectId: number,
    userId: number
  ) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });
    const data = {
      project_id: projectId,
      user_id: userId
    }
    return this._http.post(`${this.url}/accept_signature`, data, { headers: headers });
  }


  //agrega links

  addLink(
    token: any,
    taskId: number,
    typeLink: string,
    nameLInk: string,
    link: string
  ) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });
    const data = {

      task_id: taskId,
      type_link: typeLink,
      name_link: nameLInk,
      link
    }
    return this._http.post(`${this.url}/create_link`, data, { headers: headers });
  }

  //actualiza links
  updateLink(
    token: any,
    Id: number,
    typeLink: string,
    nameLInk: string,
    link: string
  ) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });
    const data = {

      id: Id,
      type_link: typeLink,
      name_link: nameLInk,
      link
    }
    return this._http.post(`${this.url}/update_link`, data, { headers: headers });
  }


  //ELIMINA LINKS
  deleteLink(
    token: any,
    Id: number
  ) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });
    const data = {
      link_id: Id
    }
    return this._http.post(`${this.url}/delete_link`, data, { headers: headers });
  }

  //muestra todos los links
  getLinks(token: any, taskId:number){
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = {
      task_id: taskId
    }

    return this._http.post(`${this.url}/show_link`, data, { headers: headers });
  }


}
