import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoaService } from '../../services/poa.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-form-poa',
  templateUrl: './detail-form-poa.component.html',
  styleUrl: './detail-form-poa.component.css'
})
export class DetailFormPoaComponent {

  token = localStorage.getItem('token');
  email: any;
  fullname: any;
  dataUser: any;
  poaId: any;
  poaDetail: any;
  is_edit: boolean = false;
  companies: any;

  updatePoa = {
    area: '',
    objective: '',
    total_resources: 0,
    total_aproved: 0,
    status: '',
    coment_rejected: '',
  }
  enterprises: any[] = [];
  campuses: any[] = [];

  selectedEnterprises: number[] = [];
  selectedCampuses: number[] = [];
  savedEnterprises: { [id: number]: number } = {};
  savedCampuses: { [id: number]: number } = {};

  constructor(private _router: Router, private _poaService: PoaService, private _routeActivated: ActivatedRoute) { }

  ngOnInit() {
    this._routeActivated.params.subscribe(params => {
      this.poaId = +params['id'];
      // console.log(this.poaId);
    });
    this.getavatar();
    this.getInfoPoa();
    this.dash();
  }


  //dashboard
  dash() {
    this._poaService.dashborad(this.token).subscribe((resp: any) => {
      console.log('dashboard es', resp.data);
    })
  }

  //obtiene datos de l usuario guardados en el local storage
  getavatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.dataUser = userData;
    this.email = this.dataUser.email
    this.fullname = this.dataUser.first_name + ' ' + this.dataUser.last_name;
  }

  //obtiene info sobre el poa creado
  // Carga la información inicial y marca los ítems seleccionados

  getInfoPoa() {
    this._poaService.detailPoa(this.token, this.poaId).subscribe((resp: any) => {
      this.poaDetail = resp.data;
      // console.log('detalles son', this.poaDetail);

      this.poaDetail.params_info.forEach((item: any) => {
        if (item.type === 'EMPRESA') {
          this.enterprises.push(item);
        } else if (item.type === 'INSTITUTO') {
          this.campuses.push(item);
        }
      });

      this.poaDetail.detail_poa_institute.forEach((institute: any) => {
        // console.log('Verificando selección para:', institute);
        // Suponiendo que los institutos pueden ser tanto empresas como campus
        if (this.enterprises.some(e => e.id === institute.institute_id)) {
          this.selectedEnterprises.push(institute.institute_id);
          this.savedEnterprises[institute.institute_id] = institute.id;
        } else if (this.campuses.some(c => c.id === institute.institute_id)) {
          this.selectedCampuses.push(institute.institute_id);
          this.savedCampuses[institute.institute_id] = institute.id;
        }
      });

      // console.log('Empresas seleccionadas:', this.selectedEnterprises);
      // console.log('Campus seleccionados:', this.selectedCampuses);
    });
  }

  toggleEnterpriseSelection(event: any, enterprise: any) {
    // console.log('Cambiando selección de empresa:', enterprise);
    if (event.target.checked) {
      this.selectedEnterprises.push(enterprise.id);
      this.saveEnterprise(enterprise);
    } else {
      const index = this.selectedEnterprises.indexOf(enterprise.id);
      if (index !== -1) {
        this.selectedEnterprises.splice(index, 1);
        this.removeCampusAndCompany(enterprise.id, 'enterprise');
      }
    }
    // console.log('Empresas seleccionadas después del cambio:', this.selectedEnterprises);
  }

  toggleCampusSelection(event: any, campus: any) {
    

    if (event.target.checked) {
        this.selectedCampuses.push(campus.id);
        this.saveCampus(campus);
    } else {
        const index = this.selectedCampuses.indexOf(campus.id);
        if (index !== -1) {
            this.selectedCampuses.splice(index, 1);
            this.removeCampusAndCompany(campus.id, 'campus');
        }
    }
}


  saveEnterprise(enterprise: any) {
    this._poaService.saveCompAndInst(this.token, this.poaId, enterprise.id).subscribe((resp: any) => {
      if (resp.status === 'ok') {
        const savedId = resp.data.id;
        this.savedEnterprises[enterprise.id] = savedId;
        // console.log('Empresa guardada:', enterprise.id, 'con ID en backend:', savedId);
        
      }
    });
  }

  saveCampus(campus: any) {
    this._poaService.saveCompAndInst(this.token, this.poaId, campus.id).subscribe((resp: any) => {
      if (resp.status === 'ok') {
        const savedId = resp.data.id;
        this.savedCampuses[campus.id] = savedId;
        window.location.reload();
        // console.log('Campus guardado:', campus.id, 'con ID en backend:', savedId);
      }
    });
  }

  isEnterpriseSelected(id: number): boolean {
    return this.selectedEnterprises.includes(id);
  }

  isCampusSelected(id: number): boolean {
    return this.selectedCampuses.includes(id);
  }

  removeCampusAndCompany(id: number, type: string) {
    const savedId = type === 'enterprise' ? this.savedEnterprises[id] : this.savedCampuses[id];
    if (savedId) {
      this._poaService.deleteCompAndInst(this.token, savedId).subscribe((resp: any) => {
        if (resp.status === 'ok') {
          // console.log('Eliminado correctamente:', id, 'del tipo:', type);
          if (type === 'enterprise') {
            delete this.savedEnterprises[id];
          } else {
            delete this.savedCampuses[id];
          }
        }
      });
    } else {
      alert('Error, contacte con el administrador, a la brevedad');
    }
  }

  // Método para generar un nuevo ID si es necesario
  generateNewInstituteId(): number {
    return Math.max(...this.poaDetail.detail_poa_institute.map((item: any) => item.id)) + 1;
  }

  //formulario para actualiza poa
  Update() {
    this._poaService.updatePoa(
      this.token,
      this.poaId,
      this.updatePoa.area = this.poaDetail.area,
      this.poaDetail.academic_year_id,
      this.updatePoa.objective = this.poaDetail.objective,
      this.poaDetail.total_resources,
      this.updatePoa.total_aproved = this.poaDetail.total_aproved,
      this.updatePoa.status = this.poaDetail.status,
      this.updatePoa.coment_rejected = this.poaDetail.coment_rejected
    ).subscribe((resp: any) => {
      if (resp.status == 'ok') {
        alert('POA actualizado exitosamente');
        this.enterprises = [];
        this.campuses = [];
        this.selectedEnterprises = [];
        this.selectedCampuses = [];
        // window.location.reload();
        this.is_edit = false;
        // console.log(resp);
        this.getInfoPoa();

      } 
    });
  }

  //ELIMINAR EL POA
  onDelete() {
    if (window.confirm('¿Está seguro de eliminar este POA? este proceso no se puede deshacer.')) {
      this._poaService.deletePoa(this.token, this.poaId).subscribe((resp: any) => {
        if (resp.status == 'ok') {
          // console.log(resp);
          // console.log(this.poaId);
          this._router.navigate(['/home-poa']);
        }
      });
    }
  }

  //metodo para editar o no el poa
  editPoa() {
    this.is_edit = true;
    // console.log(this.is_edit);
  }

  noEdit() {
    this.is_edit = false;
    // console.log(this.is_edit);
  }


}
