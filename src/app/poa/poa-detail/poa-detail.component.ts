import { Component, OnInit } from '@angular/core';
import { PoaService } from '../../services/poa.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-poa-detail',
  templateUrl: './poa-detail.component.html',
  styleUrl: './poa-detail.component.css'
})
export class PoaDetailComponent {
  poaId: number = 0;
  token = localStorage.getItem('token');
  poaDetail: any;

  upPoa = {
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
    status: ''
  }

  selectedStatus: string = '';
  taskStates = ['EN PROCESO', 'APROBADO', 'RECHAZADO'];

  constructor(
    private _poaService: PoaService,
    private _router: Router,
    private _routeActivated: ActivatedRoute
  ) { }

  ngOnInit() {
    this._routeActivated.params.subscribe(params => {
      this.poaId = +params['id'];
      console.log(this.poaId);
    });
    this.getPoa();
  }

  //obtiene datos del poa
  getPoa() {
    this._poaService.detailPoa(this.token, this.poaId).subscribe((resp: any) => {
      this.poaDetail = resp.data;
      console.log(this.poaDetail);
    });
  }

  //actualiza poa
  onUpdate() {
    this._poaService.updatePoa(
      this.token,
      this.poaId,
      this.upPoa.area = this.poaDetail.area,
      this.upPoa.commission = this.poaDetail.commission,
      this.upPoa.department = this.poaDetail.department,
      this.upPoa.ccpf = this.poaDetail.ccpf,
      this.upPoa.student_council = this.poaDetail.student_council,
      this.upPoa.name = this.poaDetail.name,
      this.upPoa.responsible = this.poaDetail.responsible,
      this.upPoa.academic_year_id = this.poaDetail.academic_year_id,
      this.upPoa.objective = this.poaDetail.objective,
      this.upPoa.total = this.poaDetail.total,
      this.upPoa.status = this.selectedStatus
    ).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == 'ok') {
        if (window.confirm('Poa actualizado con éxito, ¿desea regresar al listado?')) {
          this._router.navigate(['/home-poa']);
        }
      }
    });
  }
}
