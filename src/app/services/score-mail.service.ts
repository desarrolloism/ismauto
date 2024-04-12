import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ScoreMailService {

  

  constructor(private _http: HttpClient) { }


  sendEmail(ScoreUrl: string, maintenanceId: string) {
    const url = `${ScoreUrl}/${maintenanceId}`;
    return this._http.get(url);
  }
}
