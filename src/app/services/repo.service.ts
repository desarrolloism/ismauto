import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  constructor(private _http: HttpClient) { }

  public auth = GLOBAL.authorization;
  public url = GLOBAL.url;
  public token: any;

  //obtiene nav bar de repo
  getNav(token:any){
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });
    const data = {}

    return this._http.post(`${this.url}/repo_navbar`, data, { headers: headers });
  }

  //obtiene los documentos del repositorio
  getRepository(token: any, categoriaID:number) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });
    

    const data = {
      'categoria_id': categoriaID
    }
    return this._http.post(`${this.url}/repository`, data, { headers: headers });
  }

  //realiza busqueda de proceso
  searchProcess(token: any, search: string) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });
    const data = {
      'search': search
    }
    return this._http.post(`${this.url}/repo_search`, data, { headers: headers });
  }

  downloadRepo(token: any,documentoID:number) {
    const headers = new HttpHeaders({
      'Authorization': this.auth,
      'Content-Type': 'application/json',
      'Token': token
    });

    const data = {
      'documento_id': documentoID
    }

    return this._http.post(`${this.url}/download`, data, { headers: headers, responseType: 'blob'   });

  }
} 
