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
  maintStatus: string = '';
  maintSearch: string = '';
  selectedStatus: string = '';
  statuses: string[] = ['INICIANDO', 'SOLICITADO', 'EN PROCESO', 'EN ESPERA', 'ENTREGADO', 'FINALIZADO', 'ELIMINADO'];


  constructor(private _maintService: MaintenanceService,

  ) {
    this.token = localStorage.getItem('token');
    this.list(this.actualPage);
  }

  list(page: number) {
    // console.log(this.maintStatus);
    this._maintService.all(this.token, page, this.maintStatus, this.maintSearch).subscribe(
      res => {
        this.responseUrl = res;
        // console.log(res);
        if (this.responseUrl.status == 'OK') {
          this.maintenances = this.responseUrl.maintenance;
          this.isAdmin = this.responseUrl.isAdmin;
          this.totalPages = this.responseUrl.totalPages;
          this.actualPage = this.responseUrl.page;
          this.filtrarMant = this.maintenances;
          this.allMant = this.responseUrl.maintenance;
          this.maintenances = this.allMant;
          // console.log(this.isAdmin);
        }
      }
    )
  }

  createTicket() {
    // console.log('create ticket');
    // console.log(this.token);
  }

  filterStatus(status: string) {
    this.maintStatus = status;
    this.selectedStatus = status;
    // llama metodo list recuperando info, el 1 lo que pobla al pram page puede ser otro num
    this.list(1);

  }

  filterSearch() {
    this.list(1);
  }

  ngOnInit(): void {

  }



  
}
