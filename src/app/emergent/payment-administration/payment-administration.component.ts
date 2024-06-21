// payment-administration.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { GLOBAL } from '../../services/global';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-payment-administration',
  templateUrl: './payment-administration.component.html',
  styleUrls: ['./payment-administration.component.css']
})
export class PaymentAdministrationComponent implements OnInit {
  id: any;

  constructor(private paymentService: PaymentService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) { }



  selectedTabIndex = 0;
  paidPayments: any = [];
  initiatedPayments: any = [];
  rejectedPayments: any = [];
  approvedPayments: any = [];
  isUpdating = false;
  updatingPaymentId: number | null = null;

  filteredPaidPayments: any[] = [];

  clearFilter() {
    this.filteredPaidPayments = [...this.paidPayments];
  }

  urlFiles = GLOBAL.url;
  urlPhotos = this.urlFiles + "/files/payments/camps/";
  paymentPhotos: { [key: number]: string } = {};

  paymentPhoto: string | null = null;

  avatar: string = '';
  name: string = '';
  email: string = '';
  last_name: string = '';
  fullname: string = '';


  readonly panelOpenState = signal(false);

  displayedColumns = [
    'name',
    'dni',
    'transfer_photo',
    'phone',
    'email',
    'bank_name',
    'payment_method',
    'number_voucher',
    'date_inscription',
    'year',
    'payment_total',
    'is_innovu'
  ];


  ngOnInit() {
    this.loadPayments('PAGADO');
    this.loadPayments('INICIANDO');
    this.loadPayments('PAGO RECHAZADO');
    this.loadPayments('PAGO APROBADO');
    this.getAvatar();
  }

  filterPayments(paymentMethod: string) {
    this.filteredPaidPayments = this.paidPayments.filter((payment: { payment_method: string; }) => payment.payment_method === paymentMethod);
  }


  getAvatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.avatar = userData.avatar;
    this.name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    this.fullname = this.name + ' ' + this.last_name
  }


  //muestra tabla
  loadPayments(status: string) {
    this.paymentService.getAllPayments(status).subscribe((resp: any) => {
      switch (status) {
        case 'PAGADO':
          this.paidPayments = resp.data;
          this.filteredPaidPayments = [...this.paidPayments];
          break;
        case 'INICIANDO':
          this.initiatedPayments = resp.data;
          break;
        case 'PAGO RECHAZADO':
          this.rejectedPayments = resp.data;
          break;
        case 'PAGO APROBADO':
          this.approvedPayments = resp.data;
          break;
        default:
      }
    });
  }

  //actualiza estado
  updateStatus(id: number, newStatus: string) {
    this.updatingPaymentId = id;
    let action = newStatus === 'PAGO APROBADO' ? 'aprobar' : 'rechazar';

    if (window.confirm(`¿Está seguro de que desea ${action} este pago?`)) {
      this.paymentService.updatePayment(id, newStatus).subscribe(
        (resp: any) => {
          console.log(`Pago ${action}ado:`, resp);
          this.loadPayments('PAGADO');
          this.loadPayments('INICIANDO');
          this.loadPayments('PAGO RECHAZADO');
          this.loadPayments('PAGO APROBADO');
          this.updatingPaymentId = null;
        }
      );
    } else {
      this.updatingPaymentId = null;
    }
  }

  getPhoto(id: number) {
    this.updatingPaymentId = id;
    this.paymentService.getPaymentPhoto(id).subscribe(
      (resp: any) => {
        // console.log(resp);
        // console.log(this.updatingPaymentId);
        // console.log('url es', this.urlPhotos);
        // console.log(resp.image_url);
        if (resp.status === 'ok' && resp.image_url) {
          this.paymentPhotos[id] = this.urlPhotos + '/' + resp.image_url;
          // console.log('FOTO ES ', this.paymentPhotos[id]);
        } else {
          console.log('error');
        }
      }
    );
  }

}