import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'https://api.abitmedia.cloud/pagomedios/v2/payment-requests';
  private token = '3wv1x3b0eyc5zj8vxnqaiqaeiutgi7pphk4p0nbtrekg-gcpdrzsnlxihqhxgb7vszqlo';

  constructor(private http: HttpClient) { }

  createPaymentRequest(paymentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, paymentData, { headers });
  }
}
