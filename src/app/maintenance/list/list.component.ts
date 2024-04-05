import { Component } from '@angular/core';
import { MaintenanceService } from '../../services/maintenance.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  token: any;
  responseUrl: any;
  maintenances: any[] = [];
  isAdmin: boolean = false;
  totalPages: number = 1;
  actualPage: number = 1;
  filtrarMant: any[] = [];
  allMant: any[] = [];
  labelFilt: boolean = false;
  filtroSeleccionado: string = '';
  totalTickets: number = 0;

  constructor(private _maintService: MaintenanceService) {
    this.token = localStorage.getItem('token');
    this.list(this.actualPage);
  }

  list(page: number) {
    this._maintService.all(this.token, page).subscribe(
      res => {
        this.responseUrl = res;
        console.log(this.responseUrl);
        if (this.responseUrl.status == 'OK') {
          this.maintenances = this.responseUrl.maintenance;
          this.isAdmin = this.responseUrl.isAdmin;
          this.totalPages = this.responseUrl.totalPages;
          this.actualPage = this.responseUrl.page;
          this.filtrarMant = this.maintenances;
          this.allMant = this.responseUrl.maintenance;
          this.maintenances = this.allMant;
          console.log(this.maintenances);
          console.log(this.isAdmin);
        }
      }
    )
  }

  createTicket() {
    console.log('create ticket');
    console.log(this.token);
  }

  filterStatus(status: string) {
    this.filtrarMant = this.allMant.filter(maintenance => maintenance.case.status.code === status);
    this.labelFilt = true;
    this.filtroSeleccionado = status;
  }



  ngOnInit(): void {

  }

}
