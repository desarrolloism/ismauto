import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoaService } from '../../services/poa.service';
import { forkJoin, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { saveAs } from 'file-saver'; 
import { UsersService } from '../../services/users.service';

declare var bootstrap: any;

interface Poa {
  id: number;
  status: string;
  area: string;
  total_resources: number;
  total_aproved: number;
  academic_year_id: number;
  department: string;
  case_id: number;
  creator?: any;
  status2: string;
}

@Component({
  selector: 'app-poalist',
  templateUrl: './poalist.component.html',
  styleUrl: './poalist.component.css'
})
export class PoalistComponent implements OnInit {
  poaList: Poa[] = [];
  filteredPoaList: Poa[] = [];
  token = localStorage.getItem('token');
  searchTerm: string = '';
  searchTerms = new Subject<string>();
  avatar: string = '';
  name: string = '';
  email: string = '';
  last_name: string = '';
  fullname: string = '';
  is_admin: boolean = false;
  dni: string = '';
  isFilterActive = false;
  isApprovedActive = false;
  isRejectedActive = false;
  notStartedPoa: any;
  isClearActive = false;
  showProgressBar = false;
  insertDetail: any;
  showSuccessToast = false;
  isInitiatingActive = false;
  isInProcessActive = false;
  isFinanceActive = false;
  fileName: string = 'Registro de POA';
  is_Boss: any;
  isLoading: boolean =  false;

  constructor(private _router: Router, private _poaService: PoaService, private _userServ: UsersService) { }

  ngOnInit() {
    this.getAvatar();
    this.getPoaList();
    this.getBoos();
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => this.performSearch(term));
  }

  onSearch() {
    this.searchTerms.next(this.searchTerm);
  }

  performSearch(term: string) {
    if (term && term.length > 2) {
      this._poaService.searchPoa(this.token, term).subscribe(
        (results: any) => {
          this.filteredPoaList = results.data.map((poa: Poa) => ({
            ...poa,
            creator: {
              ...poa.creator,
              name: poa.creator?.name || poa.status || 'Sin asignar'
            }
          }));
        },
        (error) => {
          console.error('Error en la búsqueda:', error);
        }
      );
    } else {
      this.filteredPoaList = [...this.poaList];
    }
  }

  goToPoa(id: number) {
    this._router.navigate(['/poa-detail', id]);
  }

  getPoaList() {
    this.isLoading = true;
    this._poaService.list(this.token).pipe(
      switchMap((resp: any) => {
        this.poaList = resp.data.map((poa: Poa) => ({ ...poa, creator: poa.creator || {} }));
        const creatorCalls = this.poaList.map(poa => 
          this._poaService.poaCreator(this.token, poa.case_id)
        );
        return forkJoin(creatorCalls);
      })
    ).subscribe(
      (creatorResponses: any[]) => {
        this.isLoading = false;
        creatorResponses.forEach((resp, index) => {
          this.poaList[index].creator = resp.data;
        });
        this.filteredPoaList = [...this.poaList];
      },
      (error) => {
        console.error('Error al obtener la lista de POA:', error);
      }
    );
  }

  getAvatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.avatar = userData.avatar;
    this.name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    this.fullname = this.name + ' ' + this.last_name;
    this.dni = userData.dni;
  }

  filterPoa(status: string | null) {
    if (status === null) {
      this.filteredPoaList = [...this.poaList];
    } else {
      this.filteredPoaList = this.poaList.filter(poa =>
        poa.status.toLowerCase() === status.toLowerCase() &&
        (this.searchTerm === '' ||
          poa.area.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          poa.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          poa.creator?.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
  }

  toggleApproved() {
    this.resetFilters();
    this.isApprovedActive = !this.isApprovedActive;
    if (this.isApprovedActive) {
      this.filterPoa('APROBADO');
    } else {
      this.filterPoa(null);
    }
  }

  toggleFinance() {
    this.resetFilters();
    this.isFinanceActive = !this.isFinanceActive;
    if (this.isFinanceActive) {
      this.filterPoa('CRISTIAN GONZALO VACA MONTOYA');
    } else {
      this.filterPoa(null);
    }
  }

  countPoaByStatus(status: string): number {
    return this.poaList.filter(poa => poa.status.toLowerCase() === status.toLowerCase()).length;
  }

  toggleClear() {
    this.resetFilters();
    this.filterPoa(null);
  }

  resetFilters() {
    this.isApprovedActive = false;
    this.isRejectedActive = false;
    this.isInitiatingActive = false;
    this.isInProcessActive = false;
    this.isFinanceActive = false;
    this.isClearActive = false;
  }

  insertPoa() {
    if (confirm('¿Está seguro de insertar el POA?')) {
      this.showProgressBar = true;
      this._poaService.insertAllPoa(this.token).subscribe(
        (resp: any) => {
          this.insertDetail = resp.data;
          this.showProgressBar = false;
          if (resp.status === 'ok') {
            this.showSuccessToast = true;
            const toastElement = document.getElementById('successToast');
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
            this.getPoaList();
          } else {
            alert('No se pudo insertar el POA, comuníquese con el administrador.');
          }
        },
        (error) => {
          this.showProgressBar = false;
          alert('Ocurrió un error al insertar el POA, comuníquese con el administrador.');
          this._router.navigate(['/erroruser']);
        }
      );
    }
  }

  filterPoaByStatus2(status: string) {
    this.filteredPoaList = this.poaList.filter(poa =>
      poa.status2.toLowerCase() === status.toLowerCase() &&
      (this.searchTerm === '' ||
        poa.area.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        poa.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        poa.creator?.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  toggleInitiating() {
    this.resetFilters();
    this.isInitiatingActive = !this.isInitiatingActive;
    if (this.isInitiatingActive) {
      this.filterPoaByStatus2('INICIANDO');
    } else {
      this.filterPoa(null);
    }
  }

  toggleInProcess() {
    this.resetFilters();
    this.isInProcessActive = !this.isInProcessActive;
    if (this.isInProcessActive) {
      this.filterPoaByStatus2('EN PROCESO');
    } else {
      this.filterPoa(null);
    }
  }

  countPoaByStatus2(status: string): number {
    return this.poaList.filter(poa => poa.status2.toLowerCase() === status.toLowerCase()).length;
  }

  downloadPoa() {
    this._poaService.poaExcel(this.token, this.fileName).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.fileName}.xlsx`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading the file:', error);
      }
    );
  }

  getBoos() {
    this._userServ.BoosLogin(this.token, this.dni).subscribe(
      (resp: any) => {
        this.is_Boss = resp.data.is_jefe;
        // console.log('es jefe:', this.is_Boss);
      }
    )
  }
  
}