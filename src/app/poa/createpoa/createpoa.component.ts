import { Component, OnInit } from '@angular/core';
import { PoaService } from '../../services/poa.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-createpoa',
  templateUrl: './createpoa.component.html',
  styleUrls: ['./createpoa.component.css']
})
export class CreatepoaComponent implements OnInit {
  //variables de formulario de creacion

  isLinear = false;

  totalForm!: FormGroup;
  isLoading: boolean = false;
  token = localStorage.getItem('token');
  cedula: any;
  avatar: string = '';
  name: string = '';
  email: string = '';
  last_name: string = '';
  fullname: string = '';
  ciUser: string = '';
  academicYearId: number = 0;
  companies = ['ISM', 'REWA', 'CONSTRUCTEC', 'IMPAK', 'PAXDEM', 'DIGLO']; // Add all available companies
  campuses = ['QUITO', 'NORTH', 'WEST', 'KIDS', 'ONLINE'];

  newPoa = {
    cedula: '',
    area: '',
    commission: '',
    department: '',
    ccpf: '',
    student_council: '',
    name: '',
    responsible: '',
    academic_year_id: 19,
    objective: '',
    total_resources: 0,
    total_aproved: 0,
    status: '',
    coment_rejected: '',
    user_Ci: ''
  };
  poaForm!: FormGroup;

  taskStates = ['INICIANDO'];

  constructor(
    private _router: Router,
    private _poaService: PoaService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // console.log(this.token);
    this.initForm();
    this.getAvatar();
    this.getCompersData();
    this.getYear();
  }


  initForm() {
    this.poaForm = this.fb.group({
      companiesStep: this.fb.group({
        companies: this.fb.array([], Validators.required)
      }),
      campusesStep: this.fb.group({
        campuses: this.fb.array([], Validators.required)
      }),
      areaStep: this.fb.group({
        area: ['', Validators.required]
      }),
      objectiveStep: this.fb.group({
        objective: ['', Validators.required]
      })
    });
  }

  

  get companiesFormArray() {
    return this.poaForm.get('companiesStep.companies') as FormArray;
  }

  get campusesFormArray() {
    return this.poaForm.get('campusesStep.campuses') as FormArray;
  }


  //elige empresa y campus 
  onCompanyChange(event: any, company: string) {
    if (event.target.checked) {
      this.companiesFormArray.push(this.fb.control(company));
    } else {
      const index = this.companiesFormArray.controls.findIndex(x => x.value === company);
      this.companiesFormArray.removeAt(index);
    }
  }

  onCampusChange(event: any, campus: string) {
    if (event.target.checked) {
      this.campusesFormArray.push(this.fb.control(campus));
    } else {
      const index = this.campusesFormArray.controls.findIndex(x => x.value === campus);
      this.campusesFormArray.removeAt(index);
    }
  }


  //consulta de compers la cedula
  getCompersData() {
    if (!this.ciUser) {
      alert('Por favor, ingrese un número de cédula válido.');
      return;
    }
    this.isLoading = true;
    this._poaService.getCompers(this.token, this.ciUser)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (resp: any) => {
          this.cedula = resp.data;
          console.log(this.cedula);
          if (this.cedula.nombre && this.cedula.departamento) {
            console.log('Cedula encontrada');
          } else {
            console.log('Cedula no encontrada');
            alert('Cédula no encontrada. Para crear un POA es necesario registrarse en Compers con talento humano.');
            // this.cedula = null;
            this._router.navigate(['/main']);
          }
        }
      });
  }


  //crear POA
  onCreate() {
    if (this.poaForm.valid) {
      const formValue = this.poaForm.value;
      const companies = formValue.companiesStep.companies;
      const campuses = formValue.campusesStep.campuses.map((campus: string) => ({ name: campus, percentage: 0 }));
      const area = formValue.areaStep.area;
      const objective = formValue.objectiveStep.objective;
  
      this._poaService.createPoa(
        this.token,
        area,
        this.cedula.departamento,
        this.cedula.nombre,
        19,
        objective,
        0, // total_resources
        0, // total_aproved
        this.fullname, // status
        companies,
        campuses,
        '', // coment_rejected
        this.ciUser // user_ci
      ).subscribe({
        next: (response: any) => {
          if (response && response.status === 'ok') {
            console.log('POA creado exitosamente');
            this._router.navigate(['poa-detail', response.id]);
          } else {
            console.error('Error al crear POA:', response);
          }
        },
        error: (error) => {
          console.error('Error al crear POA:', error);
        }
      });
    } else {
      console.error('El formulario no es válido');
    }
  }
  //cancelar POA
  onCancel() {
    if (window.confirm('¿Está seguro de que desea cancelar el proceso? Los datos ingresados se perderán')) {
      this._router.navigate(['/home-poa']);
    }
  }

  //obtiene datos del usuario
  getAvatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log(userData);
    this.avatar = userData.avatar;
    this.name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    this.fullname = this.name + ' ' + this.last_name
    this.ciUser = userData.dni;
  }

  //obtiene periodo academico
  getYear() {
    this._poaService.getAcademicPeriod(this.token).subscribe((resp: any) => {
      // console.log(resp.data);
      this.academicYearId = resp.data;
      console.log('periodo', this.academicYearId);
    });
  }
}