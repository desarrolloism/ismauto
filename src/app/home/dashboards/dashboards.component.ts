import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.css'
})
export class DashboardsComponent implements OnInit {
  constructor(private _dash: DashboardService) { }

  ngOnInit() {
    this.dashboard();
  }

  token = localStorage.getItem('token');

  // Variable para dashboard
  myDashboard: any[] = [];

  // Obtiene url de dashboards
  dashboard() {
    this._dash.dashborad(this.token).subscribe(
      (resp: any) => {
        if (Array.isArray(resp.data)) {
          this.myDashboard = resp.data;
        } else if (resp.data && typeof resp.data === 'object') {
          // Si es un objeto, lo convertimos en un array
          this.myDashboard = [resp.data];
        } else {
          // Si no es un array ni un objeto, inicializamos como array vacío
          this.myDashboard = [];
        }
      },
      (error) => {
        console.error('Error fetching dashboard:', error);
        this.myDashboard = []; // Inicializa como array vacío en caso de error
      }
    );
  }
}