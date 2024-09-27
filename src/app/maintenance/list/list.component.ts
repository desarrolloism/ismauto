import { Component, HostListener, OnDestroy } from '@angular/core';
import { MaintenanceService } from '../../services/maintenance.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { RepoService } from '../../services/repo.service';

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
  fullname: string = '';
  dni: any;
  is_Boss: any;
  repoExpanded: boolean = false;
  //variable para obtener navbar repo
  navRepo: any[] = [];

  //abre el menu de colecturi
  colecturiaExpanded: boolean = false;

  constructor(private _maintService: MaintenanceService,
    private _router: Router, private _usersService: UsersService,
    private _repo: RepoService
  ) {
    this.token = localStorage.getItem('token');
    this.list(this.actualPage);

  }


  ngOnInit() {
    this.getAvatar();
    this.navBar();
    this.getBoos();
  }

  //abre el menu de colecturia
  toggleColecturia() {
    this.colecturiaExpanded = !this.colecturiaExpanded;
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
          // console.log(this.maintenances);
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
    this.dni = userData.dni;
    this.fullname = this.name + ' ' + this.last_name
  }

  clearStatusFilter() {
    this.selectedStatus = '';
    this.filterStatus('');
  }


  logout() {
    if (window.confirm('¿Está seguro de que desea salir?')) {
      this.killToken();
      setTimeout(() => {
        localStorage.clear();
        this._router.navigate(['/login']);
      }, 1000);
    }
  }

  maintenanceReport() {
    window.open('https://lookerstudio.google.com/embed/reporting/8077023e-eb9d-4f9d-89bd-cee1846baa4c/page/HyMqD', '_blank');
  }


  getBoos() {
    this._usersService.BoosLogin(this.token, this.dni).subscribe(
      (resp: any) => {
        this.is_Boss = resp.data;
        // console.log('es jefe:', this.is_Boss);
      }
    )
  }

  //obtiene la nav para repo
  navBar() {
    this._repo.getNav(this.token).subscribe((resp: any) => {
      this.navRepo = resp.data;
      console.log('resp de nav', this.navRepo);
    });
  }

  //abre el menu de repo
  toggleRepo() {
    this.repoExpanded = !this.repoExpanded;
  }

  isInternalLink(id: number): boolean {
    return id !== 6 && id !== 7;
  }

  getRouterLink(id: number): string {
    switch (id) {
      case 2: return '/iso';
      case 3: return '/politicas-y-normativas';
      case 4: return '/documentos';
      default: return '/';
    }
  }
  getExternalLink(id: number): string {
    switch (id) {
      case 6: return 'https://help.ism.edu.ec/';
      default: return '#';
    }
  }

  gotoPage() {
    if (this.token) {
      const encodedToken = encodeURIComponent(this.token);
      // const url = `http://192.168.48.241:36171/main?token=${encodedToken}`;
      const url = `http://localhost:43653/main?token=${encodedToken}`;
      window.open(url, '_blank');
    } else {
      console.error('No se encontró un token en el localStorage');
    }
  }

  //mata al token
  killToken() {
    console.log('toquen para destruir', this.token);
    this._usersService.killToken(this.token).subscribe((resp: any) => {
      console.log('token destruido', resp);
    });
  }
}
