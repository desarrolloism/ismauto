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
  areaForm!: FormGroup;
  departmentForm!: FormGroup;
  ccpfForm!: FormGroup;
  nameForm!: FormGroup;
  responsibleForm!: FormGroup;
  studentCoachForm!: FormGroup;
  objectiveForm!: FormGroup;
  totalForm!: FormGroup;
  statusForm!: FormGroup;
  isLoading: boolean = false;
  token = localStorage.getItem('token');
  cedula: any;

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
    total: 0,
    status: 'EN PROCESO',
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
  }

  initForms() {

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

    this.objectiveForm = this.fb.group({
      objective: ['', Validators.required]
    });

    this.totalForm = this.fb.group({
      total: ['', [Validators.required, Validators.min(0)]]
    });

    this.statusForm = this.fb.group({
      status: ['', Validators.required]
    });
  }

  //consulta de compers la cedula
  getCompersData() {
    if (!this.newPoa.cedula) {
      alert('Por favor, ingrese un número de cédula válido.');
      return;
    }

    this.isLoading = true;
    this._poaService.getCompers(this.token, this.newPoa.cedula)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (resp: any) => {
          this.cedula = resp.data;
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
    if (this.areaForm.valid && this.ccpfForm.valid &&
      this.nameForm.valid && this.studentCoachForm.valid &&
      this.objectiveForm.valid && this.totalForm.valid && this.statusForm.valid) {

      this._poaService.createPoa(
        this.token,
        this.areaForm.value.area,
        'Compers',
        this.cedula.departamento,
        this.ccpfForm.value.ccpf,
        this.studentCoachForm.value.student_council,
        this.nameForm.value.name,
        this.cedula.nombre,
        19,
        this.objectiveForm.value.objective,
        this.totalForm.value.total,
        this.statusForm.value.status || 'EN PROCESO'
      ).subscribe({
        next: (response: any) => {
          if (response && response.status === 'ok') {
            console.log('POA creado exitosamente');
            this._router.navigate(['/home-poa']);
          } else {
            console.error('Error al crear POA:', response);
          }
        }
      });
    }
  }
}