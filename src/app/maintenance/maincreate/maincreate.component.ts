import { Component } from '@angular/core';
import { MaintenanceModel } from '../models/maintenance.model';
import { MaintenanceService } from '../../services/maintenance.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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

  constructor(private _mainServices: MaintenanceService,
    private _router: Router) {

  }

  onSubmit() {
    // console.log(maintForm.value.institute_id);
    // console.log(maintForm.value.type_incident);
    // console.log(maintForm.value.site );
    // console.log(maintForm.value.description_incident);

    // this._mainServices.create(this.token, maintForm).subscribe(resp => {
    //   this.createResponse = resp;
    //   if (this.createResponse.status == 'OK') {
    //     this.maintId = this.createResponse.maintId;
    //     this._router.navigate(['/maint-detail/' + this.maintId]);
    //   }
    // });

    this._mainServices.create(this.token, this.maintenance).subscribe(resp => {
      this.dataApi = resp;
      // console.log(resp);
      if (this.dataApi.status == 'OK') {
        this.maintId = this.dataApi.maintId;
        this._router.navigate(['/maint-detail/' + this.maintId]);
      }
    });
    

  }

}




