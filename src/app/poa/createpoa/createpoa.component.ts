import { Component, OnInit } from '@angular/core';
import { PoaService } from '../../services/poa.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  token = localStorage.getItem('token');
  newPoa = {
    area: '',
    commission: 'Compers',
    department: '',
    ccpf: '',
    student_coach: '',
    name: '',
    responsible: '',
    academic_year_id: 19,
    objective: '',
    total: 0,
    status: ''
  };
  taskStates = ['INICIANDO', 'EN PROCESO', 'EN REVISION', 'TERMINADO'];

  constructor(
    private _router: Router,
    private _poaService: PoaService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    console.log(this.token);
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
      student_coach: ['', Validators.required]
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

  onCreate() {
    if (this.areaForm.valid && this.departmentForm.valid && this.ccpfForm.valid &&
      this.nameForm.valid && this.responsibleForm.valid && this.studentCoachForm.valid &&
      this.objectiveForm.valid && this.totalForm.valid && this.statusForm.valid) {

      this._poaService.createPoa(
        this.token,
        this.areaForm.value.area,
        'Compers',
        this.departmentForm.value.department,
        this.ccpfForm.value.ccpf,
        this.studentCoachForm.value.student_coach,
        this.nameForm.value.name,
        this.responsibleForm.value.responsible,
        19,
        this.objectiveForm.value.objective,
        this.totalForm.value.total,
        this.statusForm.value.status
      ).subscribe(
        (response: any) => {
          if (response && response.status === 'ok') {
            console.log('POA creado exitosamente');
            this._router.navigate(['/home-poa']);
          } else {
            console.error('Error al crear POA:', response);
          }
        }
      );
    }
  }
}