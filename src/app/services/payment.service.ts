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
  private apiUrl = 'https://api.abitmedia.cloud/pagomedios/v2/payment-requests';
  private token = '3wv1x3b0eyc5zj8vxnqaiqaeiutgi7pphk4p0nbtrekg-gcpdrzsnlxihqhxgb7vszqlo';

  constructor(private _http: HttpClient) { }


  createPaymentRequest(paymentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this._http.post(this.apiUrl, paymentData, { headers });
  }



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

  Addservices(studentServiceId: number) {
    const data = {
      student_service_id: studentServiceId
    }

    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });
    return this._http.post(`${this.url}/register_service`, data, { headers: headers });
  }


  //metodo para obtener el valor total
  getStudenServices(son_id: number) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });

    const data = {
      son_id
    }

    return this._http.post(`${this.url}/get_student_services`, data, { headers: headers });
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

  deleteSon(son_id: number) {
    const data = {
      son_id
    }

    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });
    return this._http.post(`${this.url}/delete_vac_son`, data, { headers: headers });

  }


  PaymentFile(file64: any, fileName: string,
    inscriptionId: number, numberVoucher: string,
    bankName: string,
  ) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });

    const data = {
      file64,
      fileName,
      id: inscriptionId,
      number_voucher: numberVoucher,
      bank_name: bankName,
    }

    return this._http.post(`${this.url}/payment_register`, data, { headers: headers });
  }

}