import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PoaService } from '../../services/poa.service';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { MatTooltip } from '@angular/material/tooltip';

declare var bootstrap: any;

@Component({
  selector: 'app-aprove-resources',
  templateUrl: './aprove-resources.component.html',
  styleUrl: './aprove-resources.component.css'
})
export class AproveResourcesComponent implements AfterViewInit {
  @ViewChild('tooltip')
  tooltip!: MatTooltip;

  name: string = '';
  last_name: string = '';
  email: string = '';
  fullname: string = '';
  dni: string = '';
  token: string | null = localStorage.getItem('token');
  poaId: number = 0;
  activityId: number = 0;
  is_edit: boolean = false;
  createdResources: Array<any> = [];
  accounting_list: any;
  myPoa: any;
  myActivity: any;
  total_Resources: any;
  numberOfResources: any;
  is_Loading: boolean = true;
  percetagePerCampus: any;
  totalPercentage: number = 0;
  campusSend: boolean = false;
  pendingResources: any[] = [];
  approvedResources: any[] = [];
  rejectedResources: any[] = [];
  editCampus: boolean = false;
  showResources: boolean = false;
  selectedResource: any = null;
  updatedResource: any;

  adminAprove = {
    price_approved: 0,
    accounting_count: '',
    comments: ''
  }
  
  isApproving: boolean = false;
  isRejecting: boolean = false;

  approveLoading = true;

  constructor(
    private _poaService: PoaService,
    private _router: Router,
    private route: ActivatedRoute,) { }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tooltip.show();

      // Oculta el tooltip después de 3 segundos
      setTimeout(() => {
        this.tooltip.hide();
      }, 3000);  // Desaparece después de 3 segundos
    }, 1000); // Aparece 1 segundo después de cargar la página
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.poaId = +params['poa_id'];
      this.activityId = +params['act_id'];
      // console.log(params);
    });
    this.getAvatar();
    this.getPoaResources();
    this.getAccounting();
    this.getInfoPoa();
    this.getInfoActivity();
    this.totalResources();
    this.getCampusesSelected();
  }



  //obtiene datos del usuario
  getAvatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    this.fullname = this.name + ' ' + this.last_name;
    this.dni = userData.dni;
    // console.log('datos financiero', this.email);
  }

  //obtiene recursos
  getPoaResources() {
    this._poaService.getAllresources(this.token, this.activityId).subscribe((resp: any) => {
      // console.log('recursos', resp.data);
      if (resp.status === 'ok') {
        this.categorizeResources(resp.data);
      }
    });
  }

  //categoriza recursos
  categorizeResources(resources: any[]) {
    this.pendingResources = resources.filter(r => r.is_approved === 'INICIANDO');
    console.log('recursos pendientes', this.pendingResources);
    this.approvedResources = resources.filter(r => r.is_approved === 'APROBADO');
    console.log('recursos aprobados', this.approvedResources);
    this.rejectedResources = resources.filter(r => r.is_approved === 'RECHAZADO');
    console.log('recursos rechazados', this.rejectedResources);
  }

  //obtiene informacion del poa
  getInfoPoa() {
    this._poaService.detailPoa(this.token, this.poaId).subscribe((resp: any) => {

      if (resp.status == 'ok') {
        this.is_Loading = false;
        this.myPoa = resp.data;
        // console.log('informacion poa', this.myPoa);
      }

    });
  }

  //obtiene cuentas contables 
  getAccounting() {
    this._poaService.contableAccounts(this.token).subscribe((resp: any) => {
      this.accounting_list = resp.data;
      // console.log('cuentas contables', this.accounting_list);
    });
  }

  //obtiene info de la actividad
  getInfoActivity() {
    this._poaService.getDataActivity(this.token, this.activityId).subscribe((resp: any) => {
      this.myActivity = resp.data;
      console.log('informacion de mi actividad', this.myActivity);
    });
  }

  //suma los recursos
  totalResources() {
    this.approveLoading = true;
    this._poaService.sumResources(this.token, this.activityId).subscribe((resp: any) => {
      if (resp.status == 'ok') {
        this.total_Resources = resp.data;
        this.approveLoading = false;
        console.log('suma de recursos', this.total_Resources);

      }
    });
  }

  //finaliza la creacion de los recursos
  finishResources() {
    this._poaService.finishResources(this.token, this.activityId).subscribe((resp: any) => {

      if (confirm('¿Está seguro de finalizar los recursos de esta actividad?')) {
          console.log('recursos finalizados', resp);
          this._router.navigate(['/poa-detail', this.poaId]);
        
      }
    });
  }

  //obtiene el porcentaje de campuses
  getTotalPercentage(): number {
    return this.percetagePerCampus.reduce((sum: number, campus: { percentage: string; }) => sum + (parseFloat(campus.percentage) || 0), 0);
  }


  //obtiene los campus seleccionados por el usuario
  getCampusesSelected() {
    this._poaService.getCampuses(this.token, this.poaId).subscribe((resp: any) => {
      this.percetagePerCampus = resp.data;
      // console.log('porcentaje por campus', this.percetagePerCampus);


      // Merge data from myActivity?.resources
      if (this.myActivity && this.myActivity.resources) {
        this.percetagePerCampus = this.percetagePerCampus.map((campus: any) => {
          const matchingResource = this.myActivity.resources.find((resource: any) => resource.campus_name === campus.name);
          if (matchingResource) {
            return {
              ...campus,
              percentage: matchingResource.percentage
            };
          }
          return campus;
        });
      }

      this.validateTotalPercentage();
    });
  }

  //valida que los porcentajes lleguen al 100%
  validateTotalPercentage() {
    this.totalPercentage = this.percetagePerCampus.reduce((sum: number, campus: { percentage: any; }) => {
      const percentage = campus.percentage === '' ? 0 : Number(campus.percentage || 0);
      return sum + percentage;
    }, 0);
    // console.log('Porcentajes por campus:', this.percetagePerCampus);
    // console.log('Porcentaje total recalculado:', this.totalPercentage);
  }

  handlePercentageChange(campus: any) {
    if (campus.percentage === '') {
      campus.percentage = '0';
    }
    this.validateTotalPercentage();
  }



  // Método en el componente para enviar los datos de cada campus
  sendPercentages() {
    this.percetagePerCampus.forEach((campus: {
      id: number; percentage: number; name: any;
    }) => {
      const headerInstId = campus.id;
      const percentage = campus.percentage;
      this._poaService.sendCampusPercentage(this.token, headerInstId, this.activityId, percentage).subscribe(
        (resp: any) => {
          // console.log(`Campus ${campus.name} enviado exitosamente`);
          // console.log(resp.data);
          // console.log('completado', this.campusSend);
          this.campusSend = true;
          this.noeditmyCampuses();
          this.getInfoActivity();
        },
        error => {
          console.error(`Error al enviar el campus ${campus.name}:`, error);
          alert('Error al enviar el campus ' + campus.name);
        }
      );
    });
  }

  //edita los campus
  editmyCampuses() {
    this.getCampusesSelected();
    this.editCampus = true;
    this.showResources = false;
    // console.log(this.editCampus);
  }

  noeditmyCampuses() {
    this.editCampus = false;
    this.showResources = true;
  }


  //valida solo numeros
  validateNum(event: any) {
    const pattern = /^[0-9.]$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  isFinancialUser(): boolean {
    return this.email === 'financiero@ism.edu.ec' || this.email === 'direccionfinanciera@ism.edu.ec';
  }

  //actualiza los recursos
  saveResource(resource: any, isApproved: string) {
    if (isApproved === 'APROBADO' && !this.isFormValid()) {
      alert('Por favor, complete los campos requeridos para aprobar el recurso.');
      return;
    }

    if (isApproved === 'RECHAZADO' && this.adminAprove.comments.trim() === '') {
      alert('Por favor, proporcione un comentario para rechazar el recurso.');
      return;
    }

    const comments = isApproved === 'APROBADO' && this.adminAprove.comments.trim() === ''
      ? 'Aprobado'
      : this.adminAprove.comments;

    const priceApproved = isApproved === 'RECHAZADO' ? 0 : this.adminAprove.price_approved;

    this._poaService.updateResource(
      this.token,
      resource.id,
      resource.qty,
      resource.description,
      resource.price_resource,
      priceApproved,
      this.adminAprove.accounting_count,
      isApproved,
      comments
    ).subscribe(
      (resp: any) => {
        const modal = document.getElementById('staticBackdrop');
        if (modal) {
          const modalInstance = bootstrap.Modal.getInstance(modal);
          modalInstance.hide();
        }
        this.getPoaResources();
        this.resetAdminAprove();
        this.isApproving = false;
        this.isRejecting = false;
        this.totalResources();
      }
    );
  }



  //abre el modal para editar y enviar detalles
  openEditModal(resource: any) {
    this._poaService.resourceDetails(this.token, resource).subscribe((resp: any) => {
      this.updatedResource = resp.data;
      
      this.adminAprove = {
        price_approved: this.updatedResource.price_approved || this.updatedResource.price_resource,
        accounting_count: this.updatedResource.accounting_count || '',
        comments: this.updatedResource.comments || ''
      };
    });
  }


  //aprueba o rechaza recruso
  approveResource(resourceId: number) {
    this.isApproving = true;
    this.isRejecting = false;
    this._poaService.resourceDetails(this.token, resourceId).subscribe((resp: any) => {
      this.updatedResource = resp.data;
      if (this.isFormValid()) {
        this.saveResource(this.updatedResource, 'APROBADO');
      } else {
        this.accountAlert();
      }
    });
  }

  rejectResource(resourceId: number) {
    this.isApproving = false;
    this.isRejecting = true;
    this._poaService.resourceDetails(this.token, resourceId).subscribe((resp: any) => {
      this.updatedResource = resp.data;
      if (this.adminAprove.comments.trim() !== '') {
        this.saveResource(this.updatedResource, 'RECHAZADO');
      } else {
        this.comentaryAlert();
      }
    });
  }

  //limpia campos de aprobacion
  resetAdminAprove() {
    this.adminAprove = {
      price_approved: 0,
      accounting_count: '',
      comments: ''
    };
    this.isApproving = false;
    this.isRejecting = false;
  }

  //valida formulario
  isFormValid(): boolean {
    return this.adminAprove.price_approved > 0 &&
      this.adminAprove.accounting_count !== '';
  }

  //elimina recursos
  deleteResource(resource: number) {
    // console.log(resource);
    this._poaService.deleteResource(this.token, resource).subscribe((resp: any) => {
      console.log('Recurso eliminado:', resp.data);
      this.getPoaResources();
    });
  }

  cancelEdit(resource: any) {
    Object.assign(resource, resource.originalData);
    resource.isEditing = false;
    delete resource.originalData;
  }

  editResource(resource: any) {
    resource.isEditing = true;
    resource.originalData = { ...resource };
  }

  accountAlert(){
    
    Swal.fire({
      title: "Agregar cuenta contable!",
      text: "Por favor, agregue una cuenta contable para aprobar el recurso!",
      icon: "info"
    });
  }

  comentaryAlert() {
    Swal.fire({
      title: "Se requiene un comentario!",
      text: `La no aprobación de un recurso requiere un comentario!`,
      icon: "info"
    });
  }
}
