import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {


  constructor(private _paymentService: PaymentService, private _route: ActivatedRoute,
    private _router: Router,

  ) { }
  @ViewChild('fileInput', { static: false }) fileInput: any;

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.inscription_id = +params['id'];
      this.padreCheckout = params;
      this.description = 'Curso vacacional' + ' - ' + this.padreCheckout.name;
      // console.log(this.padreCheckout);
      // console.log('hola');
    });

    this.calculateTotalCost();
  }
  isVisible: boolean = false;
  padreCheckout: any;
  description: any;

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
    method: ''
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
    amount: 0,
    amount_with_tax: 0,
    amount_without_tax: 0,
    tax_value: 0,
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
  iva: number = 0.00;
  subtotalDescuentos: number = 0.00;
  innovu: number = 0.00;

  showTransf: boolean = false;
  showCredit: boolean = false;

  mostrarFormulario() {
    // console.log('hola');
    this.showTransf = !this.showTransf;
    this.padre.method = 'Transferencia';
  }

  mostrarTarjeta() {
    // console.log('hola');
    this.showCredit = !this.showCredit;
    this.padre.method = 'Tarjeta de Crédito';
  }

  //Obtiene costos 
  calculateTotalCost() {
    this.inscription_id;
    // console.log(`el id de  padre es ` + this.inscription_id);

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
          this.subtotalDescuentos = parseFloat(response.subtotal_descuentos) || 0.00;
          this.iva = response.IVA || 0.00;
          this.innovu = response.descuento_innnovu || 0.00;
          // console.log('funciona');
        }
      );
    } else {

    }
  }


  //valores de abitmedia
  onSubmit() {
    // console.log('Datos del formulario:', this.payment);
    // this.paymentData.third.name = this.padreCheckout.name;
    // this.paymentData.third.email = this.padreCheckout.email;
    // this.paymentData.third.document = this.padreCheckout.dni;
    // this.paymentData.third.document_type = this.payment.document_type;
    // this.paymentData.third.phones = this.padreCheckout.phone;
    // this.paymentData.third.address = this.padreCheckout.address;
    // this.paymentData.amount = this.paymentData.amount;
    // this.paymentData.description = this.description;


    this.paymentData.third.name = this.padreCheckout.name;
    this.paymentData.third.email = this.padreCheckout.email;
    this.paymentData.third.document = this.padreCheckout.dni;
    this.paymentData.third.document_type = this.payment.document_type;
    this.paymentData.third.phones = this.padreCheckout.phone;
    this.paymentData.third.address = this.padreCheckout.address;
    this.paymentData.amount = this.totalCost;
    this.paymentData.amount_with_tax = this.subtotalDescuentos;
    this.paymentData.amount_without_tax = 0;
    this.paymentData.tax_value = this.iva;
    this.paymentData.description = this.description;
    this.padre.method = 'Tarjeta de Crédito';


    this._paymentService.createPaymentRequest(this.paymentData).subscribe(
      resp => {
        // console.log('Respuesta de abitmedia:', resp);
        this.responseUrl = resp.data.url;
        if (this.responseUrl) {
          this.showCredit = true;
          alert('Se abrirá una nueva página para realizar el pago, luego de realizar la transacción no olvide subir una captura para validar el pago.');
          window.open(this.responseUrl, '_blank');
          // window.location.href = (this.responseUrl, '_blank');
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


  setPaymentMethod(method: string) {
    console.log('setPaymentMethod llamada con:', method);
    
    if (method === 'Transferencia' || method === 'Tarjeta de Crédito') {
      this.padre.method = method;
      this.showTransf = method === 'Transferencia';
      this.showCredit = method === 'Tarjeta de Crédito';
      console.log('padre.method asignado a:', this.padre.method);
    } else {
      console.log('Método de pago no válido:', method);
    }
  }


  uploadImage() {
    // console.log(this.padre.voucher, this.padre.bank);
    console.log(this.padre.method);
    const file: File = this.fileInput.nativeElement.files[0];
    if (file) {
      this.convertToBase64(file).then((base64: string) => {
        const fileName = file.name;
        this._paymentService.PaymentFile(
          base64,
          fileName,
          this.inscription_id,
          this.padre.voucher,
          this.padre.bank,
          this.padreCheckout.name,
          this.padreCheckout.dni,
          this.padre.method,
          this.padreCheckout.address,
          this.padreCheckout.phone,
          this.padreCheckout.email,
          this.description,
          this.totalCost
        ).subscribe(resp => {
          // console.log(resp);
          let status: any = resp;
          // console.log(fileName);
          if (status.status == 'ok') {
            alert('Se ha registrado correctamente su  comprobante de pago, el proceso ha terminado.');
            this._router.navigate(['/payment-abitmedia']);
          }
        });
      });
    } else {
      alert('Ocurrió un error, ha cargado una imagen? de no ser asi contacte con el administrador del sistema');
    }
  }


}




