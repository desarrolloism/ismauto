import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoaService } from '../../services/poa.service';

interface Poa {
  id: number;
  status: string;
  area: string;
  total_resources: number;
  total_aproved: number;
  academic_year_id: number;
  department: string;
  case_id: number;
  creator?:any;
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

  constructor(private _router: Router, private _poaService: PoaService){}

  ngOnInit() {
    this.getpoaCreator(this.caseID);
    this.getPoaList();
    this.getAvatar();
  }

    //redirige hacia poa creado mediante el id
    goToPoa(id: number) {
      this._router.navigate(['/poa-detail', id]);
    }


    getPoaList() {
      this._poaService.list(this.token).subscribe((resp: any) => {
        this.poaList = resp.data as Poa[];
        this.filteredPoaList = [...this.poaList];
        Promise.all(this.poaList.map(poa => this.getpoaCreator(poa.case_id)))
          .then(() => {
            console.log(this.poaList);
            console.log('filtered poa', this.filteredPoaList);
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

}
