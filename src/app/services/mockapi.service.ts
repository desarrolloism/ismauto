import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class MockapiService {

  constructor(private _http: HttpClient) { }
  //api de pruebas
  public url1 = 'https://665a79d0003609eda45dff59.mockapi.io';
  //fin api de pruebas

  public auth = GLOBAL.authorization;
  public url = GLOBAL.url;
  public token: any;


  //obtiene los usuarios falsos
  getFakeUsers() {
    return this._http.get(`${this.url1}/prueba`);
  }


  //crea un nuevo usuario
  createFakeUsers() {
    const data = {}
    return this._http.post(`${this.url1}/prueba`, data);
  }


}
