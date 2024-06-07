import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private url = GLOBAL.url;
  private auth = GLOBAL.authorization;

  constructor(private _http: HttpClient) { }

  //metodo para consumir sectores
  sectors(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });
    return this._http.get<any>(`${this.url}/vac_sectors`, { headers: headers });
  }


  //metodo para obtener datos
  getInfo(cedula: string) {
    const data = {
      cedula
    }
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });
    return this._http.post(`${this.url}/vac_inscription`, data, { headers: headers });
  }


  //metodo para crear reservacion de padre que no es innovu
  reservation(
    is_innovu: boolean, dni: string,
    name: string, email: string, phone: string,
    sector_address_id: number, address: string) {
    const data = {
      is_innovu,
      dni,
      name,
      email,
      phone,
      sector_address_id,
      address
    }
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });
    return this._http.post(`${this.url}/create_vac_inscription`, data, { headers: headers });
  }

  //metodo para crear crear hijos
  createSon(
    inscription_id: number,
    dni: string,
    first_name: string,
    last_name: string,
    sector_address_id: number,
    address: string,) {
    const data = {
      inscription_id,
      dni,
      first_name,
      last_name,
      sector_address_id,
      address
    }

    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });
    return this._http.post(`${this.url}/create_vac_son`, data, { headers: headers });
  }


  // metodo para actualiza info del padre
  update(
    id: number,
    dni: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    sector_address_id: any
  ) {
    const data = {
      id,
      dni,
      name,
      email,
      phone,
      address,
      sector_address_id
    }
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });
    return this._http.post(`${this.url}/update_inscription`, data, { headers: headers });

  }

  //metodo para actualizar info del hijo
  updateSon(
    id: number,
    first_name: string,
    last_name: string,
    address: string,
    sector_address_id: number
  ) {
    const data = {
      id,
      first_name,
      last_name,
      address,
      sector_address_id
    }
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });
    return this._http.post(`${this.url}/update_vac_son`, data, { headers: headers });

  }

  //muestra lista de cursos

  getCourses(son_id: number) {
    const data = {
      son_id
    }

    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });
    return this._http.post(`${this.url}/get_services_son`, data, { headers: headers });
  }

  //registra servicios

  Addservices(student_service_id: number) {
    const data = {
      student_service_id
    }

    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });
    return this._http.post(`${this.url}/register_service`, data, { headers: headers });
  }

  costTotal(inscription_id: number) {
    const data = {
      inscription_id
    }

    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });

    return this._http.post(`${this.url}/get_total_values`, data, { headers: headers });

  }



}