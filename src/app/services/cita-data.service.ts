import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaDataService {
  private citaData = new BehaviorSubject<any>({});

  constructor() {}

  updateCitaData(data: any) {
    const currentData = this.citaData.value;
    this.citaData.next({ ...currentData, ...data });
  }

  getCitaData() {
    return this.citaData.asObservable();
  }
}