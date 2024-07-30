import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class PoaService {

  private url = GLOBAL.url;
  private auth = GLOBAL.authorization;
  public token: any;

  constructor(private _http: HttpClient) { }

  //crea poa
  createPoa(
    token: any,
    // cedula: string,
    area: string,
    commission: string,
    department: string,
    ccpf: string,
    studentCouncil: string,
    name: string,
    responsible: string,
    academicYearId: number,
    objective: string,
    totalResources: number,
    totalAproved: number,
    status: string,
    company: string,
    campus: string,
    comentRejected: string,
    userCi: string
  ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });

    const data = {
      // cedula: cedula,

      area: area,
      commission: commission,
      department: department,
      ccpf: ccpf,
      student_council: studentCouncil,
      name: name,
      responsible: responsible,
      academic_year_id: academicYearId,
      objective: objective,
      total_resources: totalResources,
      total_aproved: totalAproved,
      status: status,
      company: company,
      campus: campus,
      coment_rejected: comentRejected,
      user_ci: userCi
    }
    return this._http.post(`${this.url}/poa_create`, data, { headers: headers });
  }

  //obtiene listado de poas
  list(token: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });
    const data = {}
    return this._http.post(`${this.url}/poa_list`, data, { headers: headers });
  }

  //obtiene detalle de poa por id
  detailPoa(token: any, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });
    const data = {
      id: id
    }
    return this._http.post(`${this.url}/poa_detail`, data, { headers: headers });
  }


  //actualiza poa
  updatePoa(
    token: any,
    id: number,
    area: string,
    company: string,
    campus: string,
    commission: string,
    ccpf: string,
    studentCouncil: string,
    name: string,
    academicYearId: number,
    objective: string,
    totalResources: number,
    totalAproved: number,
    status: string,
    comentRejected: string,
    userCi: string
  ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });

    const data = {
      id: id,
      area: area,
      company: company,
      campus: campus,
      commission: commission,
      ccpf: ccpf,
      student_council: studentCouncil,
      name: name,
      academic_year_id: academicYearId,
      objective: objective,
      total_resources: totalResources,
      total_aproved: totalAproved,
      status: status,
      coment_rejected: comentRejected,
      user_ci: userCi
    }
    return this._http.post(`${this.url}/poa_update`, data, { headers: headers });
  }

  //elimina el POA
  deletePoa(token: any, poaId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });
    const data = {
      poa_id: poaId
    }
    return this._http.post(`${this.url}/poa_delete`, data, { headers: headers });
  }


  //obtiene datos de compers departament y nombre de la persona
  getCompers(token: any, cedula: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });

    const data = {
      cedula: cedula
    }
    return this._http.post(`${this.url}/poa_compers`, data, { headers: headers });
  }

  //muestra actividades por poa id
  showPoaActivities(token: any, poaId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });

    const data = {
      poa_id: poaId
    }
    return this._http.post(`${this.url}/poa_activities_detail`, data, { headers: headers });
  }

  //crea actividad de poa
  createPoaActivity(
    token: any,
    poaId: number,
    activity: string,
    startDate: string,
    endDate: string,
    resourcesDetail: string,
    resourcesAmmount: number,
    approvedAmount: number,
    comments: string,
    accountingCount: string,
    priority: string,
    approvedActivity: string
  ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });

    const data = {
      poa_id: poaId,
      activity: activity,
      start_date: startDate,
      end_date: endDate,
      resources_detail: resourcesDetail,
      resources_amount: resourcesAmmount,
      approved_amount: approvedAmount,
      comments: comments,
      accounting_count: accountingCount,
      priority: priority,
      approved_activity: approvedActivity
    }
    return this._http.post(`${this.url}/poa_activities_create`, data, { headers: headers });
  }

  //actualiza actividad de poa
  updatePoaActivity(
    token: any,
    Id: number,
    activity: string,
    startDate: string,
    endDate: string,
    resourcesDetail: string,
    resourcesAmmount: number,
    approvedAmount: number,
    comments: string,
    accountingCount: string,
    priority: string,
    approvedActivity: string
  ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });

    const data = {
      id: Id,
      activity: activity,
      start_date: startDate,
      end_date: endDate,
      resources_detail: resourcesDetail,
      resources_amount: resourcesAmmount,
      approved_amount: approvedAmount,
      comments: comments,
      accounting_count: accountingCount,
      priority: priority,
      approved_activity: approvedActivity
    }
    return this._http.post(`${this.url}/poa_activities_update`, data, { headers: headers });
  }


  //elimina actividad de poa
  deletePoaActivity(token: any, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });
    const data = {
      id: id
    }
    return this._http.post(`${this.url}/poa_activities_delete`, data, { headers: headers });
  }

  //busca poa
  searchPoa(token: any, search: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });
    const data = {
      search: search
    }
    return this._http.post(`${this.url}/poa_search`, data, { headers: headers });
  }

  //buscar actividad de poa
  searchActivity(token: any, search: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });
    const data = {
      search: search
    }
    return this._http.post(`${this.url}/poa_activities_search`, data, { headers: headers });
  }

  //obtiene si el usuario del poa es admin 
  getPoaAdmin(token: any, cedula: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });
    const data = {
      cedula
    }
    return this._http.post(`${this.url}/poa_admin`, data, { headers: headers });
  }

  //crea firmas
  createSignatures(
    token: any,
    poaId: number,
    userId: number,
    coments: string,
    isAccepted: boolean,
    dateAccepted: string
  ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });
    const data = {
      poa_id: poaId,
      user_id: userId,
      coments: coments,
      is_accepted: isAccepted,
      date_send: dateAccepted
    }
    return this._http.post(`${this.url}/poa_signature_create`, data, { headers: headers });
  }

  //muestra listado de firmas
  getSignatures(token: any, poaId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });
    const data = {
      poa_id: poaId
    }
    return this._http.post(`${this.url}/poa_signature_detail`, data, { headers: headers });
  }

  // muestra listado de usuario de la base
  allUsers(token: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });

    const data = {}
    return this._http.post(`${this.url}/user_list`, data, { headers: headers });
  }

  //obtiene periodo academico 
  getAcademicPeriod(token: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });
    const data = {}
    return this._http.post(`${this.url}/poa_year`, data, { headers: headers });
  }

  //obtiene departamentos que no han realizado poa 
  getNotStartedDeps(token: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });

    const data = {}
    return this._http.post(`${this.url}/departments_without_poa`, data, { headers: headers });
  }

  //obtiene cuentas contables

  contableAccounts(token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });

    const data = {}

    return this._http.post(`${this.url}/accounting_count`,data ,{ headers: headers });
  }

}