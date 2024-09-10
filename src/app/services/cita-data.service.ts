import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitaDataService {
  private citaData = new BehaviorSubject<any>({});

  public url = GLOBAL.url;
  public auth = GLOBAL.authorization;
  token: any;

  constructor(private http: HttpClient) { }

  updateCitaData(data: any) {
    const currentData = this.citaData.value;
    this.citaData.next({ ...currentData, ...data });
  }

  getCitaData() {
    return this.citaData.asObservable();
  }

  //servicio de citas

  generateCites(subject: string,startDateTime: string, endDateTime: string, location: string, attendees: any[]) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': this.auth
    });
  
    const data = {
      "summary": subject,
      "start_date_time": startDateTime,
      "end_date_time": endDateTime,
      "location_display_name": location,
      "attendees": attendees
    };
  
    return this.http.post(`${this.url}/create_event`, data, { headers: headers });
  }
  

  createCita(cita: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.url}/create_event`, cita, { headers });
  }

}