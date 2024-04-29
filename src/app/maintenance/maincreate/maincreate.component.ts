import { Component } from '@angular/core';
// import { MaintenanceModel } from '../models/maintenance.model';
import { MaintenanceModel } from '../models/Maintenance.model';
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
    // console.log(`hola`);
    this._mainServices.create(this.token, this.maintenance).subscribe(resp => {
      this.dataApi = resp;
      console.log(resp);
      if (this.dataApi.status == 'OK') {
        this.maintId = this.dataApi.maintId;
        this._router.navigate(['/maint-detail/' + this.maintId]);
      }
    });
    

  }

}




