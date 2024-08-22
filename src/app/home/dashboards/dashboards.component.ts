import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';


@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.css'
})
export class DashboardsComponent {
  constructor(private _dash: DashboardService) { }
  ngOnInit(){
    this.dashborad();
  }
  token = localStorage.getItem('token');

  //variable para dashvboard
  myDashboard: any[] = [];

  //obtiene url de dashboards
  dashborad() {
    this._dash.dashborad(this.token).subscribe((resp: any) => {
      this.myDashboard = resp.data;
      // console.log('url de dashboards', this.myDashboard);
    });

  }

}
