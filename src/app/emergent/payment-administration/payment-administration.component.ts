import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-administration',
  templateUrl: './payment-administration.component.html',
  styleUrls: ['./payment-administration.component.css']
})
export class PaymentAdministrationComponent {
  constructor(private _paymentService: PaymentService) { }

  payment: string = '';
  allPayments: any = [];
  showPaidPayments: boolean = false;

  onSubmit(paymentStatus: string) {
    this.payment = paymentStatus;
    this._paymentService.getAllPayments(this.payment).subscribe((resp: any) => {
      this.allPayments = resp.data;
      console.log('hola', this.allPayments);
    });
  }

  togglePaymentView(status: string) {
    this.showPaidPayments = status === 'PAGADO';
    this.onSubmit(status);
  }
}