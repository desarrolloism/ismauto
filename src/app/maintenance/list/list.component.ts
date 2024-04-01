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
  totalPages : number = 1;
  actualPage: number = 1;

  constructor( private _maintService: MaintenanceService) { 
    this.token = localStorage.getItem('token');
    this.list(this.actualPage);
  }

  list(page: number){
    this._maintService.all(this.token, page).subscribe(
      res => {
        this.responseUrl = res;
        console.log(this.responseUrl);
        if(this.responseUrl.status == 'OK'){
          this.maintenances = this.responseUrl.maintenance;
          this.isAdmin = this.responseUrl.isAdmin;
          this.totalPages = this.responseUrl.totalPages;
          this.actualPage = this.responseUrl.page;
          console.log(this.maintenances);
          console.log(this.isAdmin);
        }
      }
    )
  }

  createTicket(){
    console.log('create ticket');
    console.log(this.token);
  }

 
  ngOnInit(): void {
    
  }

}
