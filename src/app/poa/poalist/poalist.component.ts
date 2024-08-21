import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoaService } from '../../services/poa.service';

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
}

@Component({
  selector: 'app-poalist',
  templateUrl: './poalist.component.html',
  styleUrl: './poalist.component.css'
})
export class PoalistComponent {
  poaList: Poa[] = [];
  filteredPoaList: Poa[] = [];
  token = localStorage.getItem('token');
  searchTerm: string = '';
  searchResults: any[] = [];
  avatar: string = '';
  name: string = '';
  email: string = '';
  last_name: string = '';
  fullname: string = '';
  is_admin: boolean = false;
  dni: string = '';
  caseID: any;
  isFilterActive = false;
  isApprovedActive = false;
  isRejectedActive = false;
  notStartedPoa: any;
  isClearActive = false;
  showProgressBar = false;
  insertDetail: any;
  showSuccessToast = false;

  constructor(private _router: Router, private _poaService: PoaService) { }

  ngOnInit() {
    this.getpoaCreator(this.caseID);
    this.getPoaList();
    this.getAvatar();
    this.showPoas();
    // this.onSearch();
  }

  //busca poa mediante ares, dep, responsable
  onSearch() {
    if (this.searchTerm && this.searchTerm.length > 2) {
      this._poaService.searchPoa(this.token, this.searchTerm).subscribe(
        (results: any) => { 
          // console.log(results);
          this.filteredPoaList = results.data;
          // console.log(this.filteredPoaList);
        },
        (error) => {
          console.error('Error en la búsqueda:', error);
        }
      );
    } else {
      this.filteredPoaList = [...this.poaList];
    }
  }

  //redirige hacia poa creado mediante el id
  goToPoa(id: number) {
    this._router.navigate(['/poa-detail', id]);
  }


  getPoaList() {
    this._poaService.list(this.token).subscribe((resp: any) => {
      this.poaList = resp.data.map((poa: Poa) => ({ ...poa, creator: poa.creator || {} })) as Poa[];
      this.filteredPoaList = [...this.poaList];
      Promise.all(this.poaList.map(poa => this.getpoaCreator(poa.case_id)))
        .then(() => {
          // console.log(this.poaList);
          // console.log('filtered poa', this.filteredPoaList);
        });
    });
  }


  getpoaCreator(id: number): Promise<void> {
    return new Promise((resolve) => {
      this._poaService.poaCreator(this.token, id).subscribe((resp: any) => {
        const creatorInfo = resp.data;
        const poa = this.poaList.find(p => p.case_id === id);
        if (poa) {
          poa.creator = creatorInfo;
        }
        // console.log(`Creador de POA ${id}:`, creatorInfo);
        resolve();
      });
    });
  }


  getAvatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    // console.log(userData);
    this.avatar = userData.avatar;
    this.name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    this.fullname = this.name + ' ' + this.last_name
    this.dni = userData.dni;
    setTimeout(() => {
      this.getPoaList();
    },1000)
    
    // console.log(this.dni);
    // console.log(this.name);
    // console.log('sdjgf', this.fullname);
    // console.log(this.email);
  }

  //filtra lista de poa
  filterPoa(status: string | null) {
    if (status === null) {
      this.onSearch();
    } else {
      this.filteredPoaList = this.poaList.filter(poa =>
        poa.status.toLowerCase() === status.toLowerCase() &&
        (this.searchTerm === '' ||
          poa.area.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
  }


  //muestra que botones estan actuivos 
  toggleApproved() {
    this.isApprovedActive = !this.isApprovedActive;
    this.isRejectedActive = false;
    this.isClearActive = false;
  }


  //cuenta cantidad de poa dependiendo del status 
  countPoaByStatus(status: string): number {
    return this.poaList.filter(poa => poa.status.toLowerCase() === status.toLowerCase()).length;
  }

  toggleClear() {
    this.isClearActive = !this.isClearActive;
    this.isApprovedActive = false;
    this.isRejectedActive = false;
  }

  //inserta poa a departamentos con jefe
  insertPoa() {
    if (confirm('¿Está seguro de insertar el POA?')) {
      // const modal = document.getElementById('exampleModal');
      // if (modal) {
      //   const modalInstance = bootstrap.Modal.getInstance(modal);
      //   modalInstance.hide();
      // }
      this.showProgressBar = true;

      this._poaService.insertAllPoa(this.token).subscribe(
        (resp: any) => {
          this.insertDetail = resp.data;
          console.log(this.insertDetail);
          this.showProgressBar = false;
          if (resp.status === 'ok') {
            this.showSuccessToast = true;
            const toastElement = document.getElementById('successToast');
            const toast = new bootstrap.Toast(toastElement);
            this.showPoas();
            this.getPoaList();
            toast.show();
            // setTimeout(() => {
              
            //   window.location.reload();
            // }, 3000);
            // window.location.reload();
          } else {
            alert('No se pudo insertar el POA, comuniquese con el administrador.');
          }
        },
        (error) => {
          this.showProgressBar = false;
          alert('Ocurrió un error al insertar el POA, comuniquese con el administrador.');
        }
      );
    }
  }

  showPoas() {
    this._poaService.list(this.token).subscribe((resp: any) => {
      this.poaList = resp.data;
      console.log(this.poaList);
    })
  }

}
