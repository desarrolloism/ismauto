import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { UserModel } from '../models/User';
import { GLOBAL } from './global';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    public url: string;
    public auth: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
        this.auth = GLOBAL.authorization;
    }

    login(username: string, password: string) {
        const user = {
            username,
            password
        };
        const headers = new HttpHeaders({
            'Authorization': this.auth,
            'Content-Type': 'application/json'
        })
        return this._http.post(`${this.url}/login`, user, { headers: headers });
    }


    all(token: any) {

        const headers = new HttpHeaders({
            'Authorization': this.auth,
            'Content-Type': 'application/json',
            'Token': token
        });
        return this._http.get(`${this.url}/users/all`, { headers: headers });
    }


}

