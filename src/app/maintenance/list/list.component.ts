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
  totalPages: number = 1;
  actualPage: number = 1;
  filtrarMant: any[] = [];
  allMant: any[] = [];
  labelFilt: boolean = false;
  filtroSeleccionado: string = '';
  totalTickets: number = 0;
  maintStatus: string = '';
  maintSearch: string = '';
  selectedStatus: string = '';
  statuses: string[] = ['INICIANDO', 'SOLICITADO', 'EN PROCESO', 'EN ESPERA', 'ENTREGADO', 'FINALIZADO', 'ELIMINADO'];
  avatar: string = '';
  name: string = '';
  email: string = '';
  last_name: string = '';
  myMant: any;

  constructor(private _maintService: MaintenanceService,

  ) {
    this.token = localStorage.getItem('token');
    this.list(this.actualPage);
  }

  ngOnInit() {
    this.getAvatar();
  }

  list(page: number) {
    this._maintService.all(this.token, page, this.maintStatus, this.maintSearch).subscribe(
      res => {
        this.responseUrl = res;
        if (this.responseUrl.status == 'OK') {
          this.maintenances = this.responseUrl.maintenance;
          this.totalPages = this.responseUrl.totalPages;
          this.actualPage = this.responseUrl.page;
          this.filtrarMant = this.maintenances;
          this.myMant = this.responseUrl.maintenance;
          this.allMant = this.responseUrl.maintenance;
          this.maintenances = this.allMant;
          console.log(this.maintenances);
        }
      }
    )
  }

  filterStatus(status: string) {
    this.maintStatus = status;
    this.selectedStatus = status;
    this.list(1);
  }
  filterSearch() {
    this.list(1);
  }


  getAvatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.avatar = userData.avatar;
    this.name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
  }

  clearStatusFilter() {
    this.selectedStatus = '';
    this.filterStatus('');
  }
}
