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
    total: number,
    status: string
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
      total: total,
      status: status,

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
    commission: string,
    department: string,
    ccpf: string,
    studentCouncil: string,
    name: string,
    responsible: string,
    academicYearId: number,
    objective: string,
    total: number,
    status: string
  ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });

    const data = {
      id: id,
      area: area,
      commission: commission,
      department: department,
      ccpf: ccpf,
      student_council: studentCouncil,
      name: name,
      responsible: responsible,
      academic_year_id: academicYearId,
      objective: objective,
      total: total,
      status: status
    }
    return this._http.post(`${this.url}/poa_update`, data, { headers: headers });
  }

  //obtiene datos de compers departament y nombre de la persona
  getCompers(token:any, cedula:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });

    const data ={
      cedula: cedula
    }

    return this._http.post(`${this.url}/poa_compers`, data, { headers: headers });
  }

}