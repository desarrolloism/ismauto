import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {


  constructor(private _paymentService: PaymentService, private _route: ActivatedRoute) { }
  @ViewChild('fileInput', { static: false }) fileInput: any;

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.inscription_id = +params['id'];
      this.padreCheckout = params;
      console.log(this.padreCheckout);
      console.log('hola');
    });

    this.calculateTotalCost();
  }
  isVisible: boolean = false;
  padreCheckout: any;

  //id del padre
  inscription_id: number = 0;

  //variables para datos del padre 
  padre = {
    id: 0,
    is_innovu: false,
    dni: '',
    name: '',
    email: '',
    phone: '',
    sector_address_id: 0,
    address: '',
    sector_name: '',
    bank: '',
    voucher: '',
  };

  //variables para el pago
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


  //variables de costos 
  totalCost: number = 0;
  selectedCourses: any[] = [];
  discountCourses: string = '0%';
  discountBrothers: string = '0%';
  discountWeeks: string = '0%';
  discountTotal: number = 0.00;
  subtotal: number = 0.00;
  total_extras: number = 0.00;

  //embebe para tarjeta de credito 
  mostrarPagoTarjeta: boolean = false;

  toggleMostrarPago() {
    this.mostrarPagoTarjeta = !this.mostrarPagoTarjeta;
  }

  showTransfer() {
    this.isVisible = !this.isVisible;
  }


  //Obtiene costos 
  calculateTotalCost() {
    this.inscription_id;
    console.log(`el id de  padre es ` + this.inscription_id);

    if (this.inscription_id) {
      this._paymentService.costTotal(
        this.inscription_id
      ).subscribe(
        (response: any) => {
          // console.log(response);
          this.totalCost = parseFloat(response.total) || 0.00;
          this.discountCourses = response.descuento_cursos || '0%';
          this.discountBrothers = response.descuento_hermanos || '0%';
          this.discountWeeks = response.descuento_semanas || '0%';
          this.discountTotal = parseFloat(response.descuento_total) || 0.00;
          this.subtotal = parseFloat(response.subtotal) || 0.00;
          this.total_extras = response.total_extras || 0.00;
          // console.log('funciona');
        }
      );
    } else {

    }
  }

  onSubmit() {
    // console.log('Datos del formulario:', this.payment);

    // Asignar los valores del formulario a paymentData
    this.paymentData.third.name = this.padreCheckout.name;
    this.paymentData.third.email = this.padreCheckout.email;
    this.paymentData.third.document = this.padreCheckout.dni;
    this.paymentData.third.document_type = this.payment.document_type;
    this.paymentData.third.phones = this.padreCheckout.phone;
    this.paymentData.third.address = this.padreCheckout.address;
    this.paymentData.description = this.payment.description;

    this._paymentService.createPaymentRequest(this.paymentData).subscribe(
      resp => {
        // console.log('Respuesta de la API:', resp);
        this.responseUrl = resp.data.url;
        if (this.responseUrl) {
          window.open(this.responseUrl, '_blank');
        }
      },
      error => {
        console.error('Error al crear la solicitud de pago', error);
      }
    );
  }


  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(',')[1]);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }


  uploadImage(isBefore: boolean) {
    console.log(this.padre.voucher, this.padre.bank);
    const file: File = this.fileInput.nativeElement.files[0];
    if (file) {
      this.convertToBase64(file).then((base64: string) => {
        const fileName = file.name;
        this._paymentService.PaymentFile(base64, fileName,
          this.inscription_id, this.padre.voucher, this.padre.bank
        ).subscribe(resp => {
          console.log(resp);
        });
      });
    } else {
      alert('Ocurrió un error, ha cargado una imagen? de no ser asi contacte con el administrador del sistema');
    }
  }

}




