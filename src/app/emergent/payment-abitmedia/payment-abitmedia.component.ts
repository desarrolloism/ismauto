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

  cards: number[] = [1];
  maxCards: number = 4;

  padre = {
    id: 0,
    is_innovu: false,
    dni: '',
    name: '',
    email: '',
    phone: '',
    sector_address_id: 0,
    address: ''
  };

  student = {
    id: 0,
    dni: '',
    firs_name: '',
    last_name: '',
    sector_address_id: 0,
    inscription_id: 0,
    address: ''
  };

  sons: any[] = [];
  responseCed: any;
  responseCreate: any;
  totalCost: number = 0; // Agregar esta línea

  // Método para recibir datos
  getinfoPadre() {
    this._paymentService.getInfo(this.padre.dni).subscribe(
      resp => {
        this.responseCed = resp;
        console.log(resp);
        if (this.responseCed && this.responseCed.status === 'ok') {
          const data = this.responseCed.data;
          this.padre.id = data.id;
          this.padre.is_innovu = true;
          this.padre.dni = data.dni;
          this.padre.name = data.name;
          this.padre.email = data.email;
          this.padre.phone = data.phone;
          this.padre.sector_address_id = data.sector_address_id;
          console.log(this.padre.sector_address_id);
          this.padre.address = data.address;
          this.padre.is_innovu = true;
          if (data.sons && data.sons.length > 0) {
            this.student.firs_name = data.sons.first_name;
            this.student.last_name = data.sons.last_name;
            this.student.dni = data.sons.dni;
          }
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
          alert('Usuario registrado con exito');
        }
      }
    );
  }

  // Método para actualizar información del padre
  upPadre: any;
  updatePadre() {
    console.log(this.padre.sector_address_id);
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
      }
    );
  }

  updStud: any;

  updateStudent() {
    for (let i = 0; i < this.sons.length; i++) {
      const son = this.sons[i];
      console.log('Datos del estudiante:',
        son.first_name,
        son.last_name,
        son.address,
        son.id,
        son.sector_address_id
      );
      this._paymentService.updateSon(
        son.id,
        son.first_name,
        son.last_name,
        son.address,
        son.sector_address_id
      ).subscribe(resp => {
        console.log(resp);
        this.updStud = resp;
        if (this.updStud.status === 'ok') {
          alert('Información actualizada con exito');
        } else {
          alert('Ocurrio un error al actualizar la información, intenta de nuevo mas tarde');
        }
      });
    }
  }

  createNewSon() {
    console.log(this.student.inscription_id);
    this._paymentService.createSon(
      this.student.inscription_id = this.padre.id,
      this.student.dni,
      this.student.last_name,
      this.student.firs_name,
      this.student.sector_address_id,
      this.student.address,
    ).subscribe(resp => {
      console.log(resp);
    });
  }

  // Listado de cursos
  getVacCourses(sonId: number) {
    this.courses = [];
    this._paymentService.getCourses(sonId).subscribe(
      (resp: any) => {
        if (resp.status === 'ok') {
          const courseData = resp.data.map((course: { ammount: number; }) => ({ ...course, selected: course.ammount > 0 }));
          this.courses = this.courses.concat(courseData);
          this.openCoursesModal();
        }
      }
    );
  }

  openCoursesModal() {
    const modal = document.getElementById('coursesModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeCoursesModal() {
    const modal = document.getElementById('coursesModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  toggleAllSelection(event: any) {
    const isChecked = event.target.checked;
    this.courses.forEach(course => {
      course.selected = isChecked;
      this.onCourseSelectionChange(course);
    });
  }

  isCheckboxDisabled(course: any): boolean {
    const weekNumber = parseInt(course.week.replace('Semana ', ''));
    const selectedCourses = this.courses.filter(c => c.selected);

    if (selectedCourses.some(c => c.week === course.week && c.service !== course.service)) {
      return true;
    }

    if (['TEATRO', 'DANZA'].includes(course.service)) {
      if (weekNumber === 6) {
        return true;
      }
      if (weekNumber % 2 === 1) {
        const nextWeek = `Semana ${weekNumber + 1}`;
        return selectedCourses.some(c => c.week === nextWeek && c.service !== course.service);
      } else {
        const previousWeek = `Semana ${weekNumber - 1}`;
        return selectedCourses.some(c => c.week === previousWeek && c.service !== course.service);
      }
    }

    return false;
  }

  onCourseSelectionChange(course: any) {
    const weekNumber = parseInt(course.week.replace('Semana ', ''));
    const isSelected = course.selected;

    if (['TEATRO', 'DANZA'].includes(course.service)) {
      if (weekNumber % 2 === 1 && isSelected) {
        this.selectCourseForWeek(course.service, `Semana ${weekNumber + 1}`, true);
      } else if (weekNumber % 2 === 0 && !isSelected) {
        this.selectCourseForWeek(course.service, `Semana ${weekNumber - 1}`, false);
      }
    }

    if (['LUNCH', 'REFRIGERIO'].includes(course.service)) {
      if (isSelected) {
        this.totalCost += 14;
      } else {
        this.totalCost -= 14;
      }
    }

    if (course.selected) {
      this._paymentService.Addservices(course.id).subscribe(
        response => {
          console.log('Servicio agregado:', response);
        },
        error => {
          console.error('Error al agregar servicio:', error);
        }
      );
    }

    this.calculateTotalCost();
  }


  selectCourseForWeek(service: string, week: string, select: boolean) {
    const course = this.courses.find(c => c.service === service && c.week === week);
    if (course) {
      course.selected = select;
    }
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
      console.error('sin id de inscripcion');
    }
  }



  courses: any[] = [];
  selectOptions: any[] = [];

  onSectorChange(selectedOptionId: any) {
    this.padre.sector_address_id = selectedOptionId;
  }

  onSectorChange2(selectedOptionId: any) {
    this.student.sector_address_id = selectedOptionId;
  }

  addCard() {
    if (this.sons.length < this.maxCards) {
      this.createNewSon();
    } else {
      alert('No puedes agregar más niños');
    }
  }

  removeCard(index: number) {
    const confirmed = confirm('¿Estás seguro de eliminar esta tarjeta?');
    if (confirmed) {
      this.sons.splice(index, 1);
    }
  }

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

  ngOnInit() {
    this._paymentService.sectors().subscribe(
      (response: any) => {
        this.sectors = response.data;
        this.selectOptions = this.sectors.map(sector => ({
          label: sector.sector,
          value: sector.id
        }));
      },
      (error) => {
        console.error('Error al obtener sectores:', error);
      }
    );
    this.calculateTotalCost();
  }

  openTotalCostModal() {
    const modal = document.getElementById('totalCostModal');
    if (modal) {
      modal.style.display = 'block';
      this.calculateTotalCost(); // Recalcular el costo total al abrir el modal
    }
  }


  closeTotalCostModal() {
    const modal = document.getElementById('totalCostModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
