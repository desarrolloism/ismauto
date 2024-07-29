import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoaService } from '../../services/poa.service';

interface Poa {
  id: number;
  status: string;
  name: string;
  area: string;
  responsible: string;
  student_council: string;
  total_resources: number;
  total_aproved: number;
  academic_year_id: number;
  user_ci: string;
}


@Component({
  selector: 'app-home-poa',
  templateUrl: './home-poa.component.html',
  styleUrl: './home-poa.component.css'
})
export class HomePoaComponent implements OnInit {
  constructor(private router: Router, private poaService: PoaService) { }

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
  isFilterActive = false;
  isApprovedActive = false;
  isRejectedActive = false;
  isClearActive = false;

  ngOnInit() {
    this.getPoaList();
    this.onSearch();
    this.getAvatar();
  }

  //obtiene lista de poa
  getPoaList() {
    this.poaService.list(this.token).subscribe((resp: any) => {
      this.poaList = resp.data;
      // this.sortPoaList();
      this.filteredPoaList = [...this.poaList];
      // console.log(this.poaList);
      console.log(this.filteredPoaList);
    });
  }

  //filtra lista de poa
  filterPoa(status: string | null) {
    if (status === null) {
      this.onSearch(); // Esto restablecerá la lista filtrada basada en la búsqueda actual
    } else {
      this.filteredPoaList = this.poaList.filter(poa =>
        poa.status.toLowerCase() === status.toLowerCase() &&
        (this.searchTerm === '' ||
          poa.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          poa.area.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          poa.responsible.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
  }


  //cuenta cantidad de poa dependiendo del status 
  countPoaByStatus(status: string): number {
    return this.poaList.filter(poa => poa.status.toLowerCase() === status.toLowerCase()).length;
  }

  //redirige hacia poa creado mediante el id
  goToPoa(id: number) {
    this.router.navigate(['/poa-detail', id]);
  }

  //busca poa mediante ares, dep, responsable
  onSearch() {
    if (this.searchTerm.length > 2) {
      this.poaService.searchPoa(this.token, this.searchTerm).subscribe(
        (results: any) => {
          this.filteredPoaList = results.data;
        },
        (error) => {
          console.error('Error en la búsqueda:', error);
        }
      );
    } else {
      this.filteredPoaList = [...this.poaList]; // Restaura la lista completa si la búsqueda está vacía
    }
  }

  //obtiewne datos del usuario 
  getAvatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log(userData);
    this.avatar = userData.avatar;
    this.name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    this.fullname = this.name + ' ' + this.last_name
    this.dni = userData.dni;
    console.log(this.dni);
    // console.log(this.name);
    console.log('sdjgf', this.fullname);
    // console.log(this.email);
  }

  //muestra que botones estan actuivos 
  toggleApproved() {
    this.isApprovedActive = !this.isApprovedActive;
    this.isRejectedActive = false;
    this.isClearActive = false;
  }

  toggleRejected() {
    this.isRejectedActive = !this.isRejectedActive;
    this.isApprovedActive = false;
    this.isClearActive = false;
  }

  toggleClear() {
    this.isClearActive = !this.isClearActive;
    this.isApprovedActive = false;
    this.isRejectedActive = false;
  }
}