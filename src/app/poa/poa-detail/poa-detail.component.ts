import { Component, OnInit } from '@angular/core';
import { PoaService } from '../../services/poa.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


declare var bootstrap: any;

@Component({
  selector: 'app-poa-detail',
  templateUrl: './poa-detail.component.html',
  styleUrl: './poa-detail.component.css'
})
export class PoaDetailComponent {
  poaId: number = 0;
  token = localStorage.getItem('token');
  poaDetail: any = {};
  allActivities: any;
  newActivity: any;
  dataActivity: any;
  dataUpdateActivity: any;
  isEditing: boolean = false;
  editingActivityId: number | null = null;
  editingActivity: any = {};


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
  }

  selectedStatus: string = '';
  taskStates = ['EN PROCESO', 'APROBADO', 'RECHAZADO'];

  createPoa = {
    poa_id: 0,
    activity_id: 0,
    area_id: 0,
    responsible_id: 0,
    activity: '',
    start_date: '',
    end_date: '',
    resources_detail: '',
    resources_ammount: 0,
    approved_ammount: 0,
    comments: '',
    accounting_count: ''
  }


  constructor(
    private _poaService: PoaService,
    private _router: Router,
    private _routeActivated: ActivatedRoute
  ) { }

  ngOnInit() {
    this._routeActivated.params.subscribe(params => {
      this.poaId = +params['id'];
      // console.log(this.poaId);
    });
    this.getPoa();
    this.showActivities();
  }

  //obtiene datos del poa
  getPoa() {
    this._poaService.detailPoa(this.token, this.poaId).subscribe((resp: any) => {
      this.poaDetail = resp.data;
      this.selectedStatus = this.poaDetail.status;
      console.log(this.poaDetail);
    });
  }

  //actualiza poa
  onUpdate() {
    let updatedStatus = this.poaDetail.status;

    if (this.selectedStatus && this.selectedStatus !== this.poaDetail.status) {
      updatedStatus = this.selectedStatus;
    }

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
      updatedStatus
    ).subscribe((resp: any) => {
      if (resp.status == 'ok') {
        if (window.confirm('Poa actualizado con éxito, ¿desea regresar al listado?')) {
          this._router.navigate(['/home-poa']);
        }
      }
    });
  }

  //cancela actualizacion de poa
  onCancel() {
    if (window.confirm('¿Está seguro de que desea cancelar el proceso? Los datos se perderán')) {
      this._router.navigate(['/home-poa']);
    }
  }

  //muestra lista de actividades
  showActivities() {
    this._poaService.showPoaActivities(this.token, this.poaId).subscribe((resp: any) => {
      // console.log(resp);
      this.allActivities = resp.data;
      console.log(this.allActivities);
    });
  }

  //creacion de actividades
  createActivity() {
    this._poaService.createPoaActivity(
      this.token,
      this.createPoa.poa_id = this.poaId,
      this.createPoa.activity,
      this.createPoa.start_date,
      this.createPoa.end_date,
      this.createPoa.resources_detail,
      this.createPoa.resources_ammount,
      this.createPoa.approved_ammount,
      this.createPoa.comments,
      this.createPoa.accounting_count
    ).subscribe(resp => {
      this.dataActivity = resp;
      if (this.dataActivity.status === 'ok') {
        // Cerrar el modal
        const modal = document.getElementById('exampleModal');
        if (modal) {
          const modalInstance = bootstrap.Modal.getInstance(modal);
          modalInstance.hide();
        }
        // Vaciar el formulario
        this.resetCreatePoaForm();
        // Actualizar la lista de actividades
        this.showActivities();
      }
    });
  }

  //actualizacion de actividades
  updateActivity(activityId: number) {
    this._poaService.updatePoaActivity(
      this.token,
      activityId,
      this.editingActivity.activity,
      this.editingActivity.start_date,
      this.editingActivity.end_date,
      this.editingActivity.resources_detail,
      this.editingActivity.resources_amount,
      this.editingActivity.approved_amount,
      this.editingActivity.comments,
      this.editingActivity.accounting_count
    ).subscribe(resp => {
      this.dataUpdateActivity = resp;
      console.log(this.dataUpdateActivity);
      if (this.dataUpdateActivity.status === 'ok') {
        this.showActivities();
      }
    });
  }

  startEditing(activity: any) {
    this.isEditing = true;
    this.editingActivityId = activity.id;
    this.editingActivity = { ...activity };
  }

  cancelEditing() {
    this.isEditing = false;
    this.editingActivityId = null;
    this.editingActivity = {};
  }

  saveChanges(activityId: number) {
    this.updateActivity(activityId);
    this.isEditing = false;
    this.editingActivityId = null;
  }


  // Función para resetear el formulario
  resetCreatePoaForm() {
    this.createPoa = {
      poa_id: 0,
      activity_id: 0,
      area_id: 0,
      responsible_id: 0,
      activity: '',
      start_date: '',
      end_date: '',
      resources_detail: '',
      resources_ammount: 0,
      approved_ammount: 0,
      comments: '',
      accounting_count: ''
    };
  }

  //obtiene el id de la actividad 
  getActivityId(activityId: number) {
    console.log(activityId);
  }
}
