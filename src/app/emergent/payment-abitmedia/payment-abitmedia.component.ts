import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-payment-abitmedia',
  templateUrl: './payment-abitmedia.component.html',
  styleUrls: ['./payment-abitmedia.component.css']
})
export class PaymentAbitmediaComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private _paymentService: PaymentService
  ) { }

  ngOnInit() {
    this._paymentService.sectors().subscribe(
      (response: any) => {
        // console.log(`hola`);
        console.log(response);
        this.sectors = response.data;
        this.weeks = response.weeks;
        this.services = response.services;
        // console.log(`sectores`+this.sectors);
        const servicesWithDiscount = [];
        for (let i = 0; i < this.services.length; i++) {
          const service = this.services[i];
          if (service.is_discount) {
            servicesWithDiscount.push(service);
            console.log(servicesWithDiscount);
          }
        }

        this.selectOptions = this.sectors.map(sector => ({
          label: sector.sector,
          value: sector.id
        }));
      }
    );
    this.calculateTotalCost();
  }


  panelOpenState = false;

  padre = {
    id: 0,
    is_innovu: false,
    dni: '',
    name: '',
    email: '',
    phone: '',
    sector_address_id: 0,
    address: '',
    sector_name: ''
  };

  student = {
    id: 0,
    dni: '',
    firs_name: '',
    last_name: '',
    sector_address_id: 0,
    inscription_id: 0,
    address: '',
  };

  sons: any[] = [];
  responseCed: any;
  responseCreate: any;
  totalCost: number = 0;

  //variables para matriz
  weeks: any;
  services: any;
  isVisible: boolean = false;
  actualStudentId: any;



  //actualiza datos del estud
  updStud: any;

  // matris de estudiantes
  courseData: any[] = [];
  courseService: any;

  //checks de cursos
  selectedCourseIds: number[] = [];



  // Método para recibir datos
  getinfoPadre() {
    this._paymentService.getInfo(this.padre.dni).subscribe(
      resp => {
        this.responseCed = resp;
        // console.log(resp);
        if (this.responseCed && this.responseCed.status === 'ok') {
          const data = this.responseCed.data;
          this.padre.id = data.id;
          this.padre.is_innovu = true;
          this.padre.dni = data.dni;
          this.padre.name = data.name;
          this.padre.email = data.email;
          this.padre.phone = data.phone;
          this.padre.sector_address_id = data.sector_address_id;
          this.padre.sector_name = data.sector_address.sector;
          console.log(this.padre.sector_address_id);
          this.padre.address = data.address;
          this.padre.is_innovu = true;
          this.sons = data.sons;
          this.sons = data.sons;
          console.log(`es innovu? ${this.padre.is_innovu}`);
        } else if (this.responseCed.message === 'Usuario no encontrado por favor llene el registro') {
          alert('Usuario no registrado, por favor llene el formulario');
        } else {
          this.createVacInscription();
        }
      }
    );
  }


  getVacCourses(studentId: number) {
    this._paymentService.getCourses(studentId).subscribe(
      (resp: any) => {
        console.log('servicios')
        console.log(resp.data);
        this.courseData = resp.data.map((course: any) => ({ ...course, selected: false }));
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }


  registerServices(weekId: number, serviceId: number) {
    let studentServiceId = 0;
    for (let i = 0; i < this.studentServicesAssignation.length; i++) {
      if (this.studentServicesAssignation[i].week_id == weekId
        && this.studentServicesAssignation[i].service_id == serviceId) {
        studentServiceId = this.studentServicesAssignation[i].id;
        break;
      }
    }
    this._paymentService.Addservices(studentServiceId).subscribe(resp => {
      this.showStudent(this.actualStudentId);
      this.calculateTotalCost();
    })
  }


  notRegistered: any;

  createVacInscription() {
    console.log(`sector padre ` + this.padre.sector_address_id);
    this._paymentService.reservation(
      false,
      this.padre.dni,
      this.padre.name,
      this.padre.email,
      this.padre.phone,
      this.padre.sector_address_id,
      this.padre.address
    ).subscribe(
      resp => {
        this.notRegistered = resp;
        console.log(this.notRegistered);
        if (this.notRegistered.message === 'Error creating inscription') {
          alert('Usuario no registrado, por favor llene el formulario');
        } else if (this.notRegistered.message === 'Inscription created successfully') {
          alert('Usuario registrado con exito, continue con el formulario');
        }
      }
    );
  }


  studentServicesAssignation: any;
  studentSon = {
    id: 0,
    inscription_id: 0,
    dni: '',
    last_name: '',
    first_name: '',
    sector_address_id: 0,
    address: '',
  };

  //metodo para realizar matriz del estudiante
  studMatriz(sonId: number) {
    this._paymentService.getStudenServices(this.actualStudentId).subscribe(
      (resp: any) => {
        this.studentServicesAssignation = resp.data.services;
        console.log(this.studentServicesAssignation);
        let conteo = 0;

        for (let i = 0; i < this.studentServicesAssignation.length; i++) {
          const service = this.studentServicesAssignation[i];
          if (service.is_discount === true) {
            conteo++;
          }
        }
        console.log(`cursos elegidos : ${conteo}`);
        console.log(this.selectedCourseIds);
        let student = resp.data.student;
        this.studentSon.id = student.id;
        this.studentSon.dni = student.dni;
        this.studentSon.first_name = student.first_name;
        this.studentSon.last_name = student.last_name;
        this.studentSon.sector_address_id = student.sector_address_id;
        this.studentSon.address = student.address;
      }
    )
  }

  activeService(week: any, service: any): boolean | null {

    const assignedService = this.studentServicesAssignation?.find(
      (s: { week_id: any; service_id: any; service_x_week_id: null; }) =>
        s.week_id === week.id &&
        s.service_id === service.id &&
        s.service_x_week_id !== null
    );

    if (assignedService) {
      if (assignedService.ammount === '0.00' && assignedService.service_x_week_id !== null) {
        return null;
      } else if (assignedService.ammount === null || assignedService.service_x_week_id === null) {
        return false;
      } else {
        return true;
      }
    }

    return false;
  }

  showStudent(sonId: any) {
    this.actualStudentId = sonId;
    console.log(sonId);
    this.studMatriz(sonId);
  }


  // Método para actualizar información del padre
  upPadre: any;
  updatePadre() {
    console.log(`padre` + this.padre.sector_address_id);
    this._paymentService.update(
      this.padre.id,
      this.padre.dni,
      this.padre.name,
      this.padre.email,
      this.padre.phone,
      this.padre.address,
      this.padre.sector_address_id
    ).subscribe(
      (resp) => {
        this.upPadre = resp;
        console.log(this.upPadre);
        alert('Información actualizada con éxito, continue con el formulario');
      }
    );
  }


  updateStudent() {
    const son = this.sons.find((son: any) => son.id === this.actualStudentId);
    this._paymentService.updateSon(
      son.id,
      son.first_name,
      son.last_name,
      this.padre.address,
      this.padre.sector_address_id
    ).subscribe(resp => {
      console.log(resp);
      this.updStud = resp;
      if (this.updStud.status === 'ok') {
        alert('Información actualizada con éxito');
      } else {
        alert('Ocurrió un error al actualizar la información, intenta de nuevo más tarde');
      }
    });
  }

  createNewSon() {
    console.log(this.padre.id);
    this._paymentService.createSon(
      this.padre.id,
      this.student.dni,
      this.student.last_name,
      this.student.firs_name,
      this.padre.sector_address_id,
      this.student.address,
    ).subscribe(resp => {
      console.log(resp);
      alert('Alumno registrado con éxito');
    });
  }

  selectedCourses: any[] = [];
  discountCourses: string = '0%';
  discountBrothers: string = '0%';
  discountWeeks: string = '0%';
  discountTotal: number = 0.00;
  subtotal: number = 0.00;

  calculateTotalCost() {
    this.student.inscription_id = this.padre.id

    if (this.student.inscription_id) {
      this._paymentService.costTotal(
        this.student.inscription_id
      ).subscribe(
        (response: any) => {
          console.log(response);
          this.totalCost = parseFloat(response.total) || 0.00;
          this.discountCourses = response.descuento_cursos || '0%';
          this.discountBrothers = response.descuento_hermanos || '0%';
          this.discountWeeks = response.descuento_semanas || '0%';
          this.discountTotal = parseFloat(response.descuento_total) || 0.00;
          this.subtotal = parseFloat(response.subtotal) || 0.00;
          console.log('funciona');
        }
      );
    } else {
      
    }
  }


  courses: any[] = [];
  selectOptions: any[] = [];

  onSectorChange(selectedOptionId: any) {
    this.padre.sector_address_id = selectedOptionId;
    console.log(this.padre.sector_address_id);
  }

  // onSectorChange2(event: any, index: number) {
  //   this.sons[index].sector_address_id = event.value;
  // }

  cedula: string = '';
  validateNum(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  isLoading: boolean = false;
  validaCedula(event: any) {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1300);
  }

  sectors: any[] = [];


  openTotalCostModal() {
    const modal = document.getElementById('totalCostModal');
    if (modal) {
      modal.style.display = 'block';
      this.calculateTotalCost();
    }
  }


  closeTotalCostModal() {
    const modal = document.getElementById('totalCostModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // METODO Pde prueba para pagos

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


  onSubmit() {
    console.log('Datos del formulario:', this.payment);

    // Asignar los valores del formulario a paymentData
    this.paymentData.third.name = this.padre.name;
    this.paymentData.third.email = this.padre.email;
    this.paymentData.third.document = this.padre.dni;
    this.paymentData.third.document_type = this.payment.document_type;
    this.paymentData.third.phones = this.padre.phone;
    this.paymentData.third.address = this.padre.address;
    this.paymentData.description = this.payment.description;

    this._paymentService.createPaymentRequest(this.paymentData).subscribe(
      resp => {
        console.log('Respuesta de la API:', resp);
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

}
