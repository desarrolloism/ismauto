import { Component, OnInit, signal } from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';


@Component({
  selector: 'app-user-purcharse',
  templateUrl: './user-purcharse.component.html',
  styleUrl: './user-purcharse.component.css'
})
export class UserPurcharseComponent {

  constructor(public _shoppingService: ShoppingService) { }

  token = localStorage.getItem('token');
  userData: any;
  ActualDate = new Date();
  updatedBy: string = '';
  fullname: string = '';
  startProcess: boolean = false;
  readonly panelOpenState = signal(false);
  allDepartaments: any;

  //variables para formulario
  requirementID: number = 0;
  productDetail: string = '';
  productQuantity: number = 0;
  departamentDestination: string = '';
  date_required: any;
  observations: string = '';
  campusSelected: string = '';
  typeSelected: string = '';
  productCodeID: number = 2;
  Observations: string = '';
  selectedDate: Date | null = null;
  selectedTime: string = '';
  estimatedDelivery: string = '';
  status: string = 'EN PROCESO';
  sapCode: string = '12345ABC';
  Mycampus: string = '';

  requirements: any[] = [];

  availableTimes = [
    { hora: '08:00' },
    { hora: '09:00' },
    { hora: '10:00' },
    { hora: '11:00' },
    { hora: '14:00' },
    { hora: '15:00' },
    { hora: '16:00' }
  ];

  campuses = [
    { campus: 'ISM Quito' },
    { campus: 'ISM North' },
    { campus: 'ISM West' },
  ];

  types = [
    { name: 'Producto' },
    { name: 'Servicio' },
  ];


  ngOnInit() {
    this.getDataUser();
    this.getDepartaments();
  }


  //cerrar open panel
  closePanel() {
    // console.log(this.startProcess);

  }

  //crea cabeceras
  createHeader() {
    this._shoppingService.createHeader(this.token, this.ActualDate, this.updatedBy,this.Mycampus).subscribe((resp: any) => {
      if (resp.status == 'ok') {
        console.log(resp.data);
        this.startProcess = true;
        this.requirementID = resp.data.id;
        this.addNewRequirement();
      } else {
        console.log('error');
      }
    });
  }


  addNewRequirement() {
    this.requirements.push({
      productDetail: '',
      campusSelected: '',
      typeSelected: '',
      productQuantity: 0,
      departamentDestination: '',
      Observations: '',
      selectedDate: null,
      selectedTime: '',
      estimatedDelivery: '',
      status: 'EN PROCESO',
      sapCode: '12345ABC'
    });
  }


  //metodo para actualiozar requerimiento
  updateRequirement(index: number) {
    const requirement = this.requirements[index];
    console.log(`requerimiento num${index + 1}:`, requirement);
  }

  //obtiene datos del usuario con el token
  getDataUser() {
    this._shoppingService.getUserShop(this.token).subscribe((resp: any) => {
      this.userData = resp.data;
      this.fullname = this.userData.first_name + ' ' + this.userData.last_name;
      this.Mycampus = this.userData.campus;
      console.log('datos', this.userData)
    });
  }

  //obtiene departamentos
  getDepartaments() {
    this._shoppingService.departamentos(this.token).subscribe((resp: any) => {
      this.allDepartaments = resp.data;
      console.log('departamentos', this.allDepartaments)
    })
  }

  //crea proceso de compra
  createPurcharse() {
    console.log('detalle del producto', this.productDetail);
    console.log('campus seleccionado', this.campusSelected);
    console.log(' tipo ', this.typeSelected);
    console.log('cantidad de producto', this.productQuantity);
    console.log('destino de departmento', this.departamentDestination);
    console.log('obervaciones', this.Observations);
    console.log('fecha seleccionado', this.selectedDate);
    console.log('Fecha select', this.selectedTime);
    console.log('Estimated Delivery:', this.estimatedDelivery);
  }


  purchase() {

    this._shoppingService.createPurcharse(this.token,
      this.requirementID,
      this.sapCode,
      this.typeSelected,
      this.productQuantity,
      this.departamentDestination,
      this.Observations,
      this.selectedDate,
      this.selectedTime,
      this.estimatedDelivery,
      this.status
    ).subscribe((resp: any) => {
      console.log(resp.data);
    });



  }

  //filtra fechas
  dateFilter = (date: Date | null): boolean => {
    const day = (date || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  //captura la fecha 
  onDateSelected(event: Date | null, index: number) {
    if (event) {
      this.requirements[index].selectedDate = event;
      this.requirements[index].estimatedDelivery = this.calculateEstimatedDelivery(event);
      this.updateRequirement(index);
    }
  }

  submitRequirement(index: number) {
    console.log('Requerimiento', this.requirementID);
    const requirement = this.requirements[index];
    this._shoppingService.createPurcharse(
      this.token,
      this.requirementID, 
      requirement.sapCode,
      requirement.typeSelected,
      requirement.productQuantity,
      requirement.departamentDestination,
      requirement.Observations,
      requirement.selectedDate,
      requirement.selectedTime,
      requirement.estimatedDelivery,
      requirement.status
    ).subscribe((resp: any) => {
      console.log(`Req #${index + 1}`, resp.data);
      // Aquí puedes agregar lógica adicional después de enviar el requerimiento
      // Por ejemplo, marcar el requerimiento como enviado o eliminarlo de la lista
    });
  }


  calculateEstimatedDelivery(selectedDate: Date): string {
    const deliveryDate = new Date(selectedDate);
    let daysToAdd = 3;

    while (daysToAdd > 0) {
      deliveryDate.setDate(deliveryDate.getDate() + 1);
      if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) {
        daysToAdd--;
      }
    }

    return deliveryDate.toISOString().split('T')[0];
  }

}
