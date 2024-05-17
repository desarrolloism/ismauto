import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PingService {

  constructor(private http: HttpClient) { }

  ping(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(() => {
          resolve(true);
        }, () => {
          resolve(false);
        });
    });
  }
}
