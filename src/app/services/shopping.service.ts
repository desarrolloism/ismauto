import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  public url = GLOBAL.url;
  public auth = GLOBAL.authorization;
  token: any;

  constructor(private _http: HttpClient) { }

  //metodo para crear cabecera de compras

  createHeader(token:any, fechaRequiere:any, ActualizadoPor:string, campus:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });

    const data = {
      fecha_requiere: fechaRequiere,
      actualizado_por: ActualizadoPor,
      campus: campus
    }

    return this._http.post(`${this.url}/create_cabeceras`,data, {headers: headers});
  }



  getUserShop(token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });
    const data = {}
    return this._http.post(`${this.url}/show_user`, data,{ headers: headers });
  }

  //OBTIENE DEPARTAMENTOS
  departamentos(token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });

    const data = {}
    return this._http.post(`${this.url}/show_departments`, data,{ headers: headers });
  }


  //Crea requerimiento de compra
  createPurcharse(
    token: any,
    cabecera_id: number,
    codigo_prod_servicio_sap: string,
    tipo_prod_servicio: string,
    cantidad: number,
    destino_departamento: string,
    destino_observacion: string,
    fecha_requerida: any,
    hora_requerida: string,
    fecha_entrega_proveedor: string,
    estado: string
  ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth,
      'Token': token
    });
  
    const data = {
      cabecera_id,
      codigo_prod_servicio_sap,
      tipo_prod_servicio,
      cantidad,
      destino_departamento,
      destino_observacion,
      fecha_requerida,
      hora_requerida,
      fecha_entrega_proveedor,
      estado
    };
  
    return this._http.post(`${this.url}/create_detalles`, data, { headers: headers });
  }
  

}
