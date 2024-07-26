import { Component, OnInit } from '@angular/core';
import { PoaService } from '../../services/poa.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-createpoa',
  templateUrl: './createpoa.component.html',
  styleUrls: ['./createpoa.component.css']
})
export class CreatepoaComponent implements OnInit {
  //variables de formulario de creacion
  enterpriseForm!: FormGroup;
  areaForm!: FormGroup;
  ccpfForm!: FormGroup;
  campusForm!: FormGroup;
  departmentForm!: FormGroup;
  studentCoachForm!: FormGroup;
  commissionForm!: FormGroup;
  nameForm!: FormGroup;
  objectiveForm!: FormGroup;
  responsibleForm!: FormGroup;
  priorityForm!: FormGroup;

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
    user_Ci:''
  };

  taskStates = ['INICIANDO'];

  constructor(
    private _router: Router,
    private _poaService: PoaService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // console.log(this.token);
    this.initForms();
    this.getAvatar();
    this.getCompersData();
    this.getYear();
  }

  initForms() {

    this.enterpriseForm = this.fb.group({
      enterprise: ['', Validators.required]
    });

    this.campusForm = this.fb.group({
      campus: ['', Validators.required]
    });

    this.areaForm = this.fb.group({
      area: ['', Validators.required]
    });

    this.departmentForm = this.fb.group({
      department: ['', Validators.required]
    });

    this.ccpfForm = this.fb.group({
      ccpf: ['', Validators.required]
    });

    this.nameForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.responsibleForm = this.fb.group({
      responsible: ['', Validators.required]
    });

    this.studentCoachForm = this.fb.group({
      student_council: ['', Validators.required]
    });

    this.commissionForm = this.fb.group({
      commission: ['', Validators.required]
    });

    this.objectiveForm = this.fb.group({
      objective: ['', Validators.required]
    });


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
            this.cedula = null;
          }
        }
      });
  }


  //crear POA
  onCreate() {
    if (this.enterpriseForm.valid && this.campusForm.valid &&
      this.areaForm.valid && this.ccpfForm.valid &&
      this.nameForm.valid && this.studentCoachForm.valid &&
      this.objectiveForm.valid && this.commissionForm.valid) {
      this._poaService.createPoa(
        this.token,
        this.areaForm.value.area,
        this.commissionForm.value.commission,
        this.cedula.departamento,
        this.ccpfForm.value.ccpf,
        this.studentCoachForm.value.student_council,
        this.nameForm.value.name,
        this.cedula.nombre,
        19,
        this.objectiveForm.value.objective,
        this.newPoa.total_resources,
        this.newPoa.total_aproved,
        this.newPoa.status = this.fullname,
        this.enterpriseForm.value.enterprise,
        this.campusForm.value.campus,
        this.newPoa.coment_rejected,
        this.newPoa.user_Ci = this.fullname
      ).subscribe({
        next: (response: any) => {
          if (response && response.status === 'ok') {
            console.log('POA creado exitosamente');
            this._router.navigate(['poa-detail', response.id]);
          } else {
            console.error('Error al crear POA:', response);
          }
        }
      });
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
  getYear(){
    this._poaService.getAcademicPeriod(this.token).subscribe((resp:any)=>{
      // console.log(resp.data);
      this.academicYearId = resp.data;
      console.log('periodo',this.academicYearId);
    });
  }
}