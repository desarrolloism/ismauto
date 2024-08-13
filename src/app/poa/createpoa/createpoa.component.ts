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
  // Variables de formulario de creación
  isLoading: boolean = false;
  token = localStorage.getItem('token');
  compersData: any;
  name: string = '';
  email: string = '';
  last_name: string = '';
  fullname: string = '';
  ciUser: string = '';
  academicYearId: number = 0;
  campuses: any = [];
  enterprises: any = [];
  companies: any = [];
  poaId = 0;
  poaForm!: FormGroup;
  selectedEnterprises: any[] = [];
  selectedCampuses: any[] = [];
  enterpriseId: number = 0;
  savedEnterprises: { [key: number]: number } = {};
  savedCampuses: { [key: number]: number } = {};


  constructor(
    private _router: Router,
    private _poaService: PoaService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    this.getAvatar();
    this.getCompersData();
    this.getYear();
    this.getCompAndCampus();
  }

   // Verifica si una empresa o campus fue seleccionado

  toggleEnterpriseSelection(event: any, id: number) {
    if (event.target.checked) {
      this.selectedEnterprises.push(id);
      this.saveEnterprise(id); 
    } else {
      const index = this.selectedEnterprises.indexOf(id);
      if (index !== -1) {
        this.selectedEnterprises.splice(index, 1);
        this.removeCampusAndCompany(id);
      }
    }
    // console.log('Empresas seleccionadas:', this.selectedEnterprises);
  }

  toggleCampusSelection(event: any, id: number) {
    if (event.target.checked) {
      this.selectedCampuses.push(id);
      this.saveCampus(id); 
    } else {
      const index = this.selectedCampuses.indexOf(id);
      if (index !== -1) {
        this.selectedCampuses.splice(index, 1);
        this.removeCampusAndCompany(id);
      }
    }
    // console.log('Campus seleccionados:', this.selectedCampuses);
  }

    // Guarda el ID de la empresa para su posterior eliminación
  saveEnterprise(id: number) {
    this._poaService.saveCompAndInst(this.token, this.poaId, id).subscribe((resp: any) => {
      if (resp.status == 'ok') {
        const savedId = resp.data.id;  
        console.log('empresa:', savedId);
        this.savedEnterprises[id] = savedId;
      }
    });
  }

  // Guarda el ID del campus para su posterior eliminación
  saveCampus(id: number) {
    this._poaService.saveCompAndInst(this.token, this.poaId, id).subscribe((resp: any) => {
      if (resp.status == 'ok') {
        const savedId = resp.data.id;  
        console.log('campus:', savedId);
        // Guarda el ID para su posterior eliminación
        this.savedCampuses[id] = savedId;
      }
    });
  }

  //verifica si una empresa o campus fue seleccionado
  isEnterpriseSelected(id: number): boolean {
    return this.selectedEnterprises.includes(id);
  }

  isCampusSelected(id: number): boolean {
    return this.selectedCampuses.includes(id);
  }

  //quita los campus y companias seleccionadas
  removeCampusAndCompany(id: number) {
    const savedId = this.savedEnterprises[id] || this.savedCampuses[id];
    if (savedId) {
      this._poaService.deleteCompAndInst(this.token, savedId).subscribe((resp: any) => {
        if (resp.status == 'ok') {
          // console.log('Empresa/Campus removido con éxito:', savedId);
        }
      });
    } else {
      alert('Error, contacte con el administrador, a la brevedad');
    }
  }

  //redirije al poa creado
  goMyPoas() {
    if (confirm('¿Desea ir al poa creado?')) {
      this._router.navigate(['poa-detail', this.poaId]);
    }
  }

  //inicializa y controla los datos el formulario
  initForm() {
    this.poaForm = this.fb.group({
      areaStep: this.fb.group({
        area: ['', Validators.required]
      }),
      objectiveStep: this.fb.group({
        objective: ['', Validators.required]
      })
    });
  }


  //obtiene los datos de compers
  getCompersData() {
    if (!this.ciUser) {
      alert('Por favor, ingrese un número de cédula válido.');
      return;
    }
    this.isLoading = true;
    this._poaService.getCompers(this.token, this.ciUser)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (resp: any) => {
          this.compersData = resp.data;
          if (this.compersData.nombre && this.compersData.departamento) {
            // console.log('Cedula encontrada');
          } else {
            // console.log('Cedula no encontrada');
            alert('Cédula no encontrada. Para crear un POA es necesario registrarse en Compers con talento humano.');
            this._router.navigate(['/main']);
          }
        }
      });
  }

  //crea el poa
  onCreate() {
    if (this.poaForm.valid) {
      const formValue = this.poaForm.value;
      const area = formValue.areaStep.area;
      const objective = formValue.objectiveStep.objective;
      this._poaService.createPoa(
        this.token,
        area,
        this.compersData.departamento,
        19,
        objective,
        0,
        0,
        this.fullname,
        ''
      ).subscribe({
        next: (response: any) => {
          if (response && response.status === 'ok') {
            this.poaId = response.id;
            // console.log('id de poa creado', this.poaId);
          } else {
            // console.error('Error al crear POA:', response);
            alert('Error al crear POA, contacte con el administrador, a la brevedad');
          }
        },
        error: (error) => {
          // console.error('Error al crear POA:', error);
          alert('Error al crear POA, contacte con el administrador, a la brevedad');
        }
      });
    }
  }

  //agrega las empresas y campus al poa
  addCampusAndCompany() {
    this.selectedEnterprises.forEach(companyId => {
      this._poaService.saveCompAndInst(this.token, this.poaId, companyId).subscribe((resp: any) => {
        // console.log(resp);
      });
    });
    this.selectedCampuses.forEach(campusId => {
      this._poaService.saveCompAndInst(this.token, this.poaId, campusId).subscribe((resp: any) => {
        // console.log(resp);
      });
    });
  }

  //obtiene datos del usuario logeado
  getAvatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    this.fullname = this.name + ' ' + this.last_name
    this.ciUser = userData.dni;
  }

  // Obtener el periodo académico
  getYear() {
    this._poaService.getAcademicPeriod(this.token).subscribe((resp: any) => {
      this.academicYearId = resp.data;
    });
  }

  // Obtener las instituciones y empresas y las almacena en diferentes variables
  getCompAndCampus() {
    this._poaService.getCompAndInst(this.token).subscribe((resp: any) => {
      this.companies = resp.data;
      this.campuses = this.companies.filter((company: any) => company.type === 'INSTITUTO');
      this.enterprises = this.companies.filter((company: any) => company.type === 'EMPRESA');
      // console.log('Institutos:', this.campuses);
      // console.log('Empresas:', this.enterprises);
    });
  }
}
