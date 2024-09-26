import { Component, OnInit } from '@angular/core';
import { PoaService } from '../../services/poa.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poa-activities',
  templateUrl: './poa-activities.component.html',
  styleUrl: './poa-activities.component.css'
})
export class PoaActivitiesComponent implements OnInit {
  name: string = '';
  last_name: string = '';
  email: string = '';
  fullname: string = '';
  dni: string = '';
  token: string | null = localStorage.getItem('token');
  poaId: number = 0;
  activityId: number = 0;

  resource: {
    quantity: number;
    description: string;
    priceResource: number;
    priceApproved: number;
    accountingAccount: string;
    ResourceApproved: string;
    isApproved: boolean;
    comments: string
  } = {
      quantity: 0,
      description: '',
      priceResource: 0,
      priceApproved: 0,
      accountingAccount: '',
      ResourceApproved: '',
      isApproved: false,
      comments: ''
    };

  update_resource = {
    description: '',
    priceApproved: 0,
    accountingCount: '',
    resource_approved: '',
    is_aproved: false
  }

  is_edit: boolean = false;

  createdResources: Array<any> = [];
  accounting_list: any;
  myPoa: any;
  myActivity: any;
  total_Resources: any;
  numberOfResources: any;

  constructor(private poaService: PoaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.poaId = +params['poa_id'];
      this.activityId = +params['act_id'];
      console.log(params);
    });
    this.getAvatar();
    this.getPoaResources();
    this.getAccounting();
    this.getInfoPoa();
    this.getInfoActivity();
    this.totalResources();
  }

  //crea recursos
  createResource() {
    this.poaService.createResources(
      this.token,
      this.activityId,
      this.resource.quantity,
      this.resource.description,
      this.resource.priceResource,
      this.resource.priceApproved,
      this.resource.accountingAccount,
      this.resource.ResourceApproved,
      this.resource.isApproved
    ).subscribe((resp: any) => {
      console.log('Recurso creado:', resp.data);
      this.getPoaResources();
      this.resetResourceForm();
      this.totalResources();
    });
  }

  resetResourceForm() {
    this.resource = {
      quantity: 0,
      description: '',
      priceResource: 0,
      priceApproved: 0,
      accountingAccount: '',
      ResourceApproved: '',
      isApproved: false,
      comments: ''
    };
  }

  //obtiene recursos
  getPoaResources() {
    console.log(this.activityId);
    this.poaService.getAllresources(this.token, this.activityId).subscribe((resp: any) => {
      console.log('listado de recursos', resp.data);
      this.createdResources = resp.data;
    });
  }

  //elimina recursos
  deleteResource(resource: number) {
    console.log(resource);
    this.poaService.deleteResource(this.token, resource).subscribe((resp: any) => {
      console.log('Recurso eliminado:', resp.data);
      this.getPoaResources();
    });
  }

  editResource(resource: any) {
    resource.isEditing = true;
    resource.originalData = { ...resource };
  }

  saveResource(resource: any) {
    this.poaService.updateResource(
      this.token,
      resource.id,
      resource.qty,
      resource.description,
      resource.price_resource,
      resource.price_approved,
      resource.accounting_count,
      resource.isApproved = 'INICIANDO',
      resource.comments
    ).subscribe(
      (resp: any) => {
        console.log('Recurso actualizado:', resp.data);
        resource.isEditing = false;
        this.getPoaResources();
        this.totalResources();
      },
      (error) => {
        console.error('Error al actualizar el recurso:', error);
        // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    );
  }

  cancelEdit(resource: any) {
    Object.assign(resource, resource.originalData);
    resource.isEditing = false;
    delete resource.originalData;
  }

  //obtiene datos del usuario
  getAvatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    this.fullname = this.name + ' ' + this.last_name;
    this.dni = userData.dni;
    console.log('datos financiero', this.email);
  }

  isFinancialUser(): boolean {
    return this.email === 'financiero@ism.edu.ec' || this.email === 'direccionfinanciera@ism.edu.ec';
  }

  //obtiene cuentas contables 
  getAccounting() {
    this.poaService.contableAccounts(this.token).subscribe((resp: any) => {
      this.accounting_list = resp.data;
      // console.log('cuentas contables', this.accounting_list);
    });
  }

  //obtiene informacion del poa
  getInfoPoa() {
    this.poaService.detailPoa(this.token, this.poaId).subscribe((resp: any) => {
      this.myPoa = resp.data;
      console.log('informacion poa', this.myPoa);
    });
  }

  //obtiene info de la actividad
  getInfoActivity() {
    this.poaService.getDataActivity(this.token, this.activityId).subscribe((resp: any) => {
      this.myActivity = resp.data;
      console.log('informacion de mi actividad', this.myActivity);
    });
  }

  //suma los recursos
  totalResources() {
    this.poaService.sumResources(this.token, this.activityId).subscribe((resp: any) => {
      if (resp.status == 'ok') {
        this.total_Resources = resp.data;
        console.log('suma de recursos', this.total_Resources);

      }
    });
  }

  //finaliza la creacion de los recursos
  finishResources() {
    this.poaService.finishResources(this.token, this.activityId).subscribe((resp: any) => {
      if (confirm('¿Está seguro de finalizar los recursos de esta actividad?')) {
        console.log('recursos finalizados', resp);
        this.router.navigate(['/poa-detail', this.poaId]);
        setTimeout(() => {
        window.location.reload();
        }, 500);
        
      }
    });
  }


}