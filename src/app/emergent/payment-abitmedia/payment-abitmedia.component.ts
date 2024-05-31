import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-abitmedia',
  templateUrl: './payment-abitmedia.component.html',
  styleUrls: ['./payment-abitmedia.component.css']
})
export class PaymentAbitmediaComponent {
  valor: number = 100;

  transp(event: any) {
    if (event.target.checked) {
      this.valor += 60;
    } else {
      this.valor -= 60;
    }
  }

  paymentData = {
    integration: true,
    third: {
      document: '',
      document_type: '05',
      name: '',
      email: '',
      phones: '',
      address: '',
      type: 'Individual'
    },
    generate_invoice: 0,
    description: '',
    amount: 1.08,
    amount_with_tax: 0.5,
    amount_without_tax: 0.5,
    tax_value: 0.08,
    settings: [],
    notify_url: null,
    custom_value: null,
    has_cash: 0,
    has_cards: 1
  };
  responseUrl: string | null = null;

  payment = {
    name: '',
    email: '',
    document: '',
    document_type: '05',
    phones: '',
    address: '',
    description: ''
  };

  constructor(private paymentService: PaymentService, private router: Router) { }

  onSubmit() {
    this.paymentData.third.name = this.payment.name;
    this.paymentData.third.email = this.payment.email;
    this.paymentData.third.document = this.payment.document;
    this.paymentData.third.document_type = this.payment.document_type;
    this.paymentData.third.phones = this.payment.phones;
    this.paymentData.third.address = this.payment.address;
    this.paymentData.description = this.payment.description;

    if (!this.isFormValid()) {
      this.handleError('Por favor, complete todos los campos.');
      return;
    }

    this.paymentService.createPaymentRequest(this.paymentData).subscribe(
      resp => {
        let response: any = resp;
        if (response.status === 201) {
          this.responseUrl = resp.data.url;
          window.open(this.responseUrl as string);
          setTimeout(() => {
            window.location.reload();
          },2000)
        } else {
          this.handleError('Error desconocido');
        }
      },
      error => {
        console.error('Error al crear la solicitud de pago', error);
        if (error.status === 422 && error.error.data) {
          const validationErrors = error.error.data.map((errorItem: any) => errorItem.message).join(', ');
          this.handleError('Error de validación: ' + validationErrors);
        } else if (error.status === 500) {
          this.handleError('Error interno del servidor. Intente de nuevo más tarde');
        } else {
          this.handleError('Error desconocido');
        }
      }
    );
  }

  private isFormValid(): boolean {
    return (
      !!this.payment.name &&
      !!this.payment.email &&
      !!this.payment.document &&
      !!this.payment.phones &&
      !!this.payment.address &&
      !!this.payment.description
    );
  }

  private handleError(message: string) {
    alert(message);
  }
}
