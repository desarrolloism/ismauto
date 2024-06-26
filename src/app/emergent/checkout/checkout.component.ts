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

  ) {


  }
  @ViewChild('fileInput', { static: false }) fileInput: any;

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.inscription_id = +params['id'];
      this.padreCheckout = params;
      this.description = 'Curso vacacional' + ' - ' + this.padreCheckout.name;
      console.log('el inscrip es ', this.inscription_id);
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

  originalPrices = {
    totalCost: 0,
    discountBrothers: '0%',
    discountWeeks: '0%',
    discountTotal: 0,
    subtotal: 0,
    total_extras: 0,
    subtotalDescuentos: 0,
    iva: 0,
    innovu: 0
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
  isDinersSelected: boolean = false;

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

  sendDiners() {
    if (confirm('¿Está seguro que desea proceder con el pago usando Diners?')) {
      this._paymentService.sendDiners(this.inscription_id).subscribe(
        (resp: any) => {
          console.log('Respuesta de Diners:', resp);
          if (resp.status === 'ok' && resp.data) {
            this.updatePrices(resp.data);
            this.isDinersSelected = true;
            this.padre.method = 'Tarjeta de Crédito - Diners';
            this.onSubmit();
          }
        },
        error => {
          console.error('Error al obtener datos de Diners:', error);
          this.restoreOriginalPrices();
        }
      );
    } else {
      alert('Pago con Diners cancelado.');
      this.restoreOriginalPrices();
    }
  }


  //Obtiene costos 
  calculateTotalCost() {
    if (this.inscription_id) {
      this._paymentService.costTotal(this.inscription_id).subscribe(
        (response: any) => {
          this.updatePrices(response);
          if (!this.originalPrices) {
            this.originalPrices = { ...response };
          }
        }
      );
    }
  }

  updatePrices(prices: any) {
    this.totalCost = parseFloat(prices.total) || 0;
    this.discountCourses = prices.descuento_cursos || '0%';
    this.discountBrothers = prices.descuento_hermanos || '0%';
    this.discountWeeks = prices.descuento_semanas || '0%';
    this.discountTotal = parseFloat(prices.descuento_total) || 0;
    this.subtotal = parseFloat(prices.subtotal) || 0;
    this.total_extras = parseFloat(prices.total_extras) || 0;
    this.subtotalDescuentos = parseFloat(prices.subtotal_descuentos) || 0;
    this.iva = parseFloat(prices.IVA) || 0;
    this.innovu = parseFloat(prices.descuento_innnovu) || 0;
  }

  restoreOriginalPrices() {
    if (this.originalPrices) {
      this.updatePrices(this.originalPrices);
    } else {
      console.error('No se encontraron precios originales para restaurar');
      this.calculateTotalCost(); // Recalcular si no hay precios originales
    }
  }

  savePrices() {
    this.originalPrices = {
      totalCost: this.totalCost,
      discountBrothers: this.discountBrothers,
      discountWeeks: this.discountWeeks,
      discountTotal: this.discountTotal,
      subtotal: this.subtotal,
      total_extras: this.total_extras,
      subtotalDescuentos: this.subtotalDescuentos,
      iva: this.iva,
      innovu: this.innovu
    };
  }


  //valores de abitmedia
  onSubmit() {
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

    if (!this.isDinersSelected) {
      this.padre.method = 'Tarjeta de Crédito';
    }

    this._paymentService.createPaymentRequest(this.paymentData).subscribe(
      resp => {
        this.responseUrl = resp.data.url;
        if (this.responseUrl) {
          this.showCredit = true;
          let message = this.isDinersSelected
            ? '¿Está seguro que desea proceder con el pago usando Diners?'
            : '¿Está seguro que desea proceder con el pago usando tarjeta de crédito?';

          if (confirm(message)) {
            let confirmationMessage = this.isDinersSelected
              ? 'Se abrirá una nueva página para realizar el pago con Diners Club, luego de realizar la transacción no olvide subir una captura para validar el pago.'
              : 'Se abrirá una nueva página para realizar el pago, luego de realizar la transacción no olvide subir una captura para validar el pago.';
            alert(confirmationMessage);
            window.open(this.responseUrl, '_blank');
          } else {
            alert('Pago cancelado.');
            // Aquí puedes agregar cualquier lógica adicional para manejar la cancelación
          }
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

      if (this.isDinersSelected) {
        this.restoreOriginalPrices();
        this.isDinersSelected = false;
      }
    } else {
      console.log('Método de pago no válido:', method);
    }

    // Verificar si los precios son 0 y recalcular si es necesario
    if (this.totalCost === 0) {
      console.log('Precios en 0, recalculando...');
      this.calculateTotalCost();
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




