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
    area: string,
    commission: string,
    department: string,
    ccpf: string,
    studentCoach: string,
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
      area: area,
      commission: commission,
      department: department,
      ccpf: ccpf,
      student_coach: studentCoach,
      name: name,
      responsible: responsible,
      academic_year_id: academicYearId,
      objective: objective,
      total: total,
      status: status
    }

    return this._http.post(`${this.url}/poa_create`, data, { headers: headers });
  }
}
