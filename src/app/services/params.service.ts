import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ParamsService {

    public url = GLOBAL.url;
    public auth = GLOBAL.authorization;

    constructor(private _http: HttpClient) {

    }

    getParams(typeParam: string, token: any) {

        const headers = new HttpHeaders({
            'Authorization': this.auth,
            'Content-Type': 'application/json',
            'Token': token
        });


        return this._http.get(`${this.url}/params/get/${typeParam}`, { headers: headers });
    }
}
