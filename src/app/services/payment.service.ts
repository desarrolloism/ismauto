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
  // private token = '3wv1x3b0eyc5zj8vxnqaiqaeiutgi7pphk4p0nbtrekg-gcpdrzsnlxihqhxgb7vszqlo'; //token de pruebas
  private token = 'hndnqtxtrqoi1z6cn2i-mh2-5v7uuklckeclg4uvzhoxxwqhfviqa4xzpek39uipd93uc';

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
    // address: string,
    // sector_address_id: number,
    // require_transporte: string,
    // sector_delivery_id: number,
    // address_delivery: string,
  ) {
    const data = {
      id,
      first_name,
      last_name,
      // address,
      // sector_address_id,
      // require_transporte,
      // sector_delivery_id,
      // address_delivery
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


  PaymentFile(
    file64: any,
    fileName: string,
    inscriptionId: number,
    numberVoucher: string,
    bankName: string,
    businessName: string,
    rucDni: string,
    paymentMethod: string,
    address: string,
    phone: string,
    email: string,
    description: string,
    paymentTotal: number
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
      business_name: businessName,
      ruc_dni: rucDni,
      payment_method: paymentMethod,
      address,
      phone,
      email,
      description,
      payment_total: paymentTotal
    }

    return this._http.post(`${this.url}/payment_register`, data, { headers: headers });
  }

  //obtiene info
  transportService(studentServiceId: number) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'

    });

    const data = {
      student_service_id: studentServiceId
    }
    return this._http.post(`${this.url}/service_transport`, data, { headers: headers });
  }

  //envia informacion
  SendTransPort(studentServiceId: number,
    sectorOriginId: number,
    addressOrigin: string,
    sectorDeliveryId: number,
    addressDelivery: string
  ) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'

    });

    const data = {
      student_service_id: studentServiceId,
      sector_origin_id: sectorOriginId,
      address_origin: addressOrigin,
      sector_delivery_id: sectorDeliveryId,
      address_delivery: addressDelivery
    }
    return this._http.post(`${this.url}/update_transport`, data, { headers: headers });
  }



  //servicio de colecturia
  getAllPayments(state: string) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'

    });

    const data = {
      state
    }
    return this._http.post(`${this.url}/payments_camp`, data, { headers: headers });
  }

  //actualiza el estado del pago
  updatePayment(id: number, newState: string, rejectionMessage: string) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });
    const data = {
      id,
      new_state: newState,
      rejection_message: rejectionMessage
    }
    return this._http.post(`${this.url}/update_payment_state`, data, { headers: headers });
  }


  //obtiene la imagen del pago
  getPaymentPhoto(id: number) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });
    const data = {
      id
    }
    return this._http.post(`${this.url}/get_payment_photo`, data, { headers: headers });
  }

  //obtiene datos de facturacion

  GetFacturingData(id: Number) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });

    const data = {
      id
    }
    return this._http.post(`${this.url}/get_collecting_payments`, data, { headers: headers });
  }


  //obtienes estudiantes de facturacion
  SonsFacturation(id: number) {

    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });

    const data = {
      id
    }
    return this._http.post(`${this.url}/son_in_service`, data, { headers: headers });
  }


  //BUSCA FACTURAS
  searchInscription(search: string, page: number) {

    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });

    const data = {
      'search': search,
      'page': page,
    }

    return this._http.post(`${this.url}/find_vacinscription`, data, { headers: headers });
  }

  //metodo para descuento por diners

  sendDiners(inscriptionId: number) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });

    const data = {
      inscription_id: inscriptionId
    }
    return this._http.post(`${this.url}/button_diners`, data, { headers: headers });
  }


  getDetailCourses(id: number) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json'
    });
    const data = {
      id
    }
    return this._http.post(`${this.url}/son_in_service`, data, { headers: headers });
  }
}
