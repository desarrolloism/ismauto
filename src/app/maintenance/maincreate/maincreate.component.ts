import { Component, OnInit } from '@angular/core';
// import { MaintenanceModel } from '../models/maintenance.model';
import { MaintenanceModel } from '../models/Maintenance.model';
import { MaintenanceService } from '../../services/maintenance.service';
import { Router } from '@angular/router';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-maincreate',
  templateUrl: './maincreate.component.html',
  styleUrl: './maincreate.component.css'
})

export class MaincreateComponent {
  token: any = localStorage.getItem('token');
  maintenance: MaintenanceModel = new MaintenanceModel();
  dataApi: any;
  maintId: any;

  isLinear = true;
  campusFormGroup!: FormGroup;
  tipoActividadFormGroup!: FormGroup;
  sitioFormGroup!: FormGroup;
  descripcionFormGroup!: FormGroup;


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private _mainServices: MaintenanceService,
    private _router: Router,
    private _formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.campusFormGroup = this._formBuilder.group({
      campus: ['', Validators.required]
    });
    this.tipoActividadFormGroup = this._formBuilder.group({
      tipoActividad: ['', Validators.required]
    });
    this.sitioFormGroup = this._formBuilder.group({
      sitio: ['', Validators.required]
    });
    this.descripcionFormGroup = this._formBuilder.group({
      descripcion: ['', Validators.required]
    });
  }

  onSubmit() {
    // Recopilar todos los valores de los formularios
    this.maintenance.institute_id = this.campusFormGroup.value.campus;
    this.maintenance.type_incident = this.tipoActividadFormGroup.value.tipoActividad;
    this.maintenance.site = this.sitioFormGroup.value.sitio;
    this.maintenance.description_incident = this.descripcionFormGroup.value.descripcion;

    // Hacer la llamada al servicio con los datos recopilados
    this._mainServices.create(this.token, this.maintenance).subscribe(resp => {
      this.dataApi = resp;
      if (this.dataApi.status === 'OK') {
        this.maintId = this.dataApi.maintId;
        this._router.navigate(['/maint-detail/' + this.maintId]);
      }
    });
  }

}




