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

  constructor(private _router: Router, private _poaService: PoaService, private _routeActivated: ActivatedRoute) { }

  ngOnInit() {
    this._routeActivated.params.subscribe(params => {
      this.poaId = +params['id'];
      // console.log(this.poaId);
    });
    this.getavatar();
    this.getInfoPoa();
  }

  //obtiene datos de l usuario guardados en el local storage
  getavatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.dataUser = userData;
    this.email = this.dataUser.email
    this.fullname = this.dataUser.first_name + ' ' + this.dataUser.last_name;
  }

  //obtiene info sobre el poa creado
  getInfoPoa() {
    this._poaService.detailPoa(this.token, this.poaId).subscribe((resp: any) => {
      this.poaDetail = resp.data;
      console.log('detalles son', this.poaDetail);
    });
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
        this.getInfoPoa();
        this.is_edit = false;
        console.log(resp);
      } else {
        alert('Error al actualizar POA');
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
  editPoa() {this.is_edit = true;
    // console.log(this.is_edit);
}

  noEdit() {this.is_edit = false;
    // console.log(this.is_edit);
  }


}
