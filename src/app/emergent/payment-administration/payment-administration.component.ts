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



  facData: any = {};
  facSonData: any = [];

  paymentSearch: string = '';

  filteredInitiatedPayments: any[] = [];
  filteredApprovedPayments: any[] = [];
  filteredRejectedPayments: any[] = [];
  rejectedMessage: string = '';

  showRejectionReason: boolean = false;
  rejectionReason: string = '';

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
    this.loadPayments('PAGO PENDIENTE');
    this.loadPayments('PAGO APROBADO');
    this.getAvatar();
    this.facData = {};
    this.facSonData = [];
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
          this.filteredInitiatedPayments = [...this.initiatedPayments];
          break;
        case 'PAGO PENDIENTE':
          this.rejectedPayments = resp.data;
          this.filteredRejectedPayments = [...this.rejectedPayments];
          break;
        case 'PAGO APROBADO':
          this.approvedPayments = resp.data;
          this.filteredApprovedPayments = [...this.approvedPayments];
          break;
      }
    });
  }
  //actualiza estado
  updateStatus(id: number, newStatus: string) {
    this.updatingPaymentId = id;
    let action = newStatus === 'PAGO APROBADO' ? 'aprobar' : 'rechazar';

    if (newStatus === 'PAGO RECHAZADO') {
      this.showRejectionReason = true;
      return;  // No proceder con la actualización aún
    }

    this.proceedWithUpdate(id, newStatus, action);
  }

  proceedWithUpdate(id: number, newStatus: string, action: string) {
    if (window.confirm(`¿Está seguro de que desea ${action} este pago?`)) {
      this.paymentService.updatePayment(id, newStatus, this.rejectionReason).subscribe(
        (resp: any) => {
          console.log(resp);
          this.loadPayments('PAGADO');
          this.loadPayments('INICIANDO');
          this.loadPayments('PAGO PENDIENTE');
          this.loadPayments('PAGO APROBADO');
          this.showRejectionReason = false;
          this.rejectionReason = '';
        }
      );
    }
  }

  getPhoto(id: number) {
    this.updatingPaymentId = id;
    this.GetFacture(id);
    this.GetSonFacturation(id);
    this.paymentService.getPaymentPhoto(id).subscribe(
      (resp: any) => {
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

  //obtiene datos de la factura
  GetFacture(id: number) {
    this.updatingPaymentId = id;
    this.paymentService.GetFacturingData(id).subscribe(
      (resp: any) => {
        this.facData = resp.data;
        // console.log(this.facData);
      }
    );

  }

  //SonsFacturation

  GetSonFacturation(id: number) {
    this.updatingPaymentId = id;
    this.paymentService.SonsFacturation(id).subscribe(
      (resp: any) => {
        this.facSonData = resp.data;
        // console.log(this.facSonData);
      }
    );
  }

  //busca pagos 

  searchPayments(page: number) {
    this.paymentService.searchInscription(this.paymentSearch, page).subscribe(resp => {
      // console.log(resp);
    })
  }

  filterSearch() {
    const searchTerm = this.paymentSearch.toLowerCase();

    this.filteredPaidPayments = this.paidPayments.filter((payment: { name: string; dni: string; email: string; }) =>
      payment.name.toLowerCase().includes(searchTerm) ||
      payment.dni.toLowerCase().includes(searchTerm) ||
      payment.email.toLowerCase().includes(searchTerm)
    );

    this.filteredInitiatedPayments = this.initiatedPayments.filter((payment: { name: string; dni: string; email: string; }) =>
      payment.name.toLowerCase().includes(searchTerm) ||
      payment.dni.toLowerCase().includes(searchTerm) ||
      payment.email.toLowerCase().includes(searchTerm)
    );

    this.filteredApprovedPayments = this.approvedPayments.filter((payment: { name: string; dni: string; email: string; }) =>
      payment.name.toLowerCase().includes(searchTerm) ||
      payment.dni.toLowerCase().includes(searchTerm) ||
      payment.email.toLowerCase().includes(searchTerm)
    );

    this.filteredRejectedPayments = this.rejectedPayments.filter((payment: { name: string; dni: string; email: string; }) =>
      payment.name.toLowerCase().includes(searchTerm) ||
      payment.dni.toLowerCase().includes(searchTerm) ||
      payment.email.toLowerCase().includes(searchTerm)
    );
  }

  visibleServices: { [key: string]: boolean } = {};

  toggleVisible(sonId: string) {
    this.visibleServices[sonId] = !this.visibleServices[sonId];
  }

  isVisible(sonId: string): boolean {
    return this.visibleServices[sonId] || false;
  }

  getPriceForService(services: any[], serviceName: string): string {
    const service = services.find(s => s.service_name.toUpperCase() === serviceName);
    return service ? service.ammount : '0.00';
  }

  getAdditionalServices(services: any[]): any[] {
    const mainServices = [''];
    return services
      .filter(s => !mainServices.includes(s.service_name.toUpperCase()))
      .sort((a, b) => a.week_id - b.week_id);
  }


}