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
  total: number;
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

  ngOnInit() {
    this.getPoaList();
    this.onSearch();
  }

  //obtiene lista de poa
  getPoaList() {
    this.poaService.list(this.token).subscribe((resp: any) => {
      this.poaList = resp.data;
      this.sortPoaList();
      this.filteredPoaList = [...this.poaList];
      // console.log(resp);
    });
  }

  //ordena lista de poa
  sortPoaList() {
    const orderMap: { [key: string]: number } = {
      'en proceso': 0,
      'aprobado': 1,
      'rechazado': 2
    };

    this.poaList.sort((a, b) => {
      const statusA = a.status.toLowerCase();
      const statusB = b.status.toLowerCase();
      return (orderMap[statusA] ?? 3) - (orderMap[statusB] ?? 3);
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

  //redirige hacia poa creado mediante el id
  goToPoa(id: number) {
    this.router.navigate(['/poa-detail', id]);
  }

  //busca poa mediante ares, dep, responsable
  onSearch() {
    if (this.searchTerm.length > 2) {
      this.poaService.searchPoa(this.token, this.searchTerm).subscribe(
        (results: any) => {
          this.filteredPoaList = results.data; // Asumiendo que la respuesta tiene una propiedad 'data'
        },
        (error) => {
          console.error('Error en la búsqueda:', error);
        }
      );
    } else {
      this.filteredPoaList = [...this.poaList]; // Restaura la lista completa si la búsqueda está vacía
    }
  }


}