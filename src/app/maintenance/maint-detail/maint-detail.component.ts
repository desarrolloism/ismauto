import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { ActivatedRoute } from '@angular/router';
import { MaintenanceService } from '../../services/maintenance.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ParamsService } from '../../services/params.service';
import { UsersService } from '../../services/users.service';
import { NgForm } from '@angular/forms';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Router } from '@angular/router';
import { ScoreMailService } from '../../services/score-mail.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-maint-detail',
  templateUrl: './maint-detail.component.html',
  styleUrl: './maint-detail.component.css'
})
export class MaintDetailComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: any;

  maintId: any;
  token: any;
  maintenanceUrl: any;
  maintenance: any;
  dateDelivery: any;

  mainDetalle = {
    id: '',
    date_estimated_delivery: '',
    priority: '',
    has_risk: false,
    status_id: '',
    user_to_assign_id: '',
    solution: '',
    institute_id: '',
    type_incident: '',
    site: '',
    score: '',
    description_incident: '',
    name: '',
    is_before: true
  }

  isAdmin: boolean = false;

  paramsUrl: any;
  params: any;

  usersUrl: any;

  photografy: any;
  selectedfile: any;

  urlFiles = GLOBAL.url;
  urlPhotos = this.urlFiles + "/files/maintenance/";
  modalImageUrl: any;
  statusName: any;
  scoreModuleUrl: string = 'score';
  filteredParams: any[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _serMaint: MaintenanceService,
    private _sanitizer: DomSanitizer,
    private _paramsServ: ParamsService,
    private _userService: UsersService,
    private _router: Router,
    private _scoreMailService: ScoreMailService,
  ) {
    this.token = localStorage.getItem('token');
    // this.params1();
    // this.users();

  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.maintId = params['maintId'];
      this.getDetail(this.maintId);
      this.params1();
      this.users();
    });
  }

  params1() {
    this._paramsServ.getParams('ESTADO_CASE', this.token).subscribe(resp => {
      // console.log(resp);
      this.paramsUrl = resp;
      this.params = this.paramsUrl.params.filter((param: { code: string; }) => param.code !== 'ESTFINALIZADO');
      this.filteredParams = this.params;
      // console.log(this.params);
    });
  }


  users() {
    this._userService.all(this.token).subscribe(resp => {
      this.usersUrl = resp;
      // console.log('users',this.usersUrl);
    });
  }

  getDetail(maintId: any) {
    this._serMaint.detail(this.token, maintId).subscribe(resp => {
      this.maintenanceUrl = resp;
      console.log(this.maintenanceUrl);
      if (this.maintenanceUrl && this.maintenanceUrl.maintenance) {
        this.maintenance = this.maintenanceUrl.maintenance;
        this.isAdmin = this.maintenanceUrl.isAdmin;
        localStorage.setItem('isAdmin', JSON.stringify(this.isAdmin));
        this.mainDetalle.id = this.maintenance.id;
        this.mainDetalle.date_estimated_delivery = this.maintenance.date_estimated_delivery;
        this.mainDetalle.priority = this.maintenance.priority;
        this.mainDetalle.has_risk = this.maintenance.has_risk;
        this.mainDetalle.status_id = this.maintenance.case.status_id;
        this.mainDetalle.user_to_assign_id = this.maintenance.case.user_to_assign_id;
        // console.log(`el ide del user es `+this.mainDetalle.user_to_assign_id);
        this.mainDetalle.institute_id = this.maintenance.case.institute_id;
        this.mainDetalle.solution = this.maintenance.solution;
        this.mainDetalle.type_incident = this.maintenance.type_incident;
        this.mainDetalle.site = this.maintenance.site;
        this.mainDetalle.score = this.maintenance.score;
        this.mainDetalle.description_incident = this.maintenance.description_incident;
        const statusChangedDate = new Date(this.maintenance.case.status.updated_at);
        this.maintenance.photos.forEach((photo: any) => {
          const photoCreatedAt = new Date(photo.created_at);
          photo.is_before = photoCreatedAt < statusChangedDate;
        });
      } else {
        alert('Error de detalle, por favor notifique al administrador');
      }
    });
  }

  uploadImage(isBefore: boolean) {
    const file: File = this.fileInput.nativeElement.files[0];
    if (file) {
      this.convertToBase64(file).then((base64: string) => {
        const fileName = file.name;
        this._serMaint.uploadFile(this.token, base64, fileName, this.maintId, isBefore).subscribe(res => {
          this.getDetail(this.maintId);
          alert('Cargado correctamente');
        });
      });
    } else {
      alert('Ocurrió un error, ha cargado una imagen? de no ser asi contacte con el administrador del sistema');
    }
  }

  onSubmit() {
    let nameStatus: String = this.buscar_nombre_estado();
    this.mainDetalle.type_incident = this.maintenanceUrl.maintenance.type_incident;
    this.mainDetalle.site = this.maintenanceUrl.maintenance.site;
    this.mainDetalle.description_incident = this.maintenanceUrl.maintenance.description_incident;
    this._serMaint.update(this.token, this.mainDetalle).subscribe(resp => {
      let respuesta: any = resp;
      if (respuesta.status == 'OK' && nameStatus == 'ENTREGADO') {
        this.sendEmailScore();
        alert('Actualizacion exitosa!');
      }
      // this._router.navigate(['/main/' + this.maintId]);
    });
    alert('Actualizacion exitosa!');
    this._router.navigate(['/list']);
  }

  buscar_nombre_estado() {
    for (let i = 0; i < this.params.length; i++) {
      if (this.params[i].id == this.mainDetalle.status_id) {
        return this.params[i].name;
      }
    }
  }

  sendEmailScore() {
    // console.log(this.token);
    this._scoreMailService.sendEmail(this.scoreModuleUrl, this.maintId, this.token).subscribe(resp => {
      // console.log(resp);
    })
  }

  viewPhotoModal(photografy: any) {
    this.photografy = photografy;
    // console.log(photografy)
  }


  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(',')[1]);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  deleteTicket(maintId: any) {
    this._serMaint.update(this.token, { maint_id: maintId, status: 'ELIMINADO' }).subscribe(resp => {
      // console.log('eliminado')
    },
      error => {
        alert('error al eliminar el ticket');
      })
  }



}
