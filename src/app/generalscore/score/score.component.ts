import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaintenanceService } from '../../services/maintenance.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  maintenance: any;
  maintenanceUrl: any;
  maintId: any;
  token: any;
  stars: number = 0;

  mainDetalle = {
    id: '',
    date_estimated_delivery: '',
    priority: '',
    has_risk: false,
    status_id: '',
    user_to_assign_id: '',
    solution: '',
    institute_id: '',
    type_incident: '',
    site: '',
    score: '',
    description_incident: '',
    name: ''
  }

  params: any;


  constructor(
    private route: ActivatedRoute,
    private _serMaint: MaintenanceService,
    private _router: Router,
  ) {
    this.token = localStorage.getItem('token');
    // this.maintenanceUrl = this._serMaint.url;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.maintId = params['maintId'];
      console.log(this.maintId);
      this.getDetail(this.maintId);

    });
  }

  getDetail(maintId: any) {
    this._serMaint.detail(this.token, maintId).subscribe(resp => {
      console.log(resp);
      this.maintenanceUrl = resp;
      if (this.maintenanceUrl && this.maintenanceUrl.maintenance) {
        this.maintenance = this.maintenanceUrl.maintenance;
        this.mainDetalle.id = this.maintenance.id;
        // this.mainDetalle.date_estimated_delivery = this.maintenance.date_estimated_delivery;
        this.mainDetalle.date_estimated_delivery = this.formatDate(this.maintenance.date_estimated_delivery);
        this.mainDetalle.priority = this.maintenance.priority;
        this.mainDetalle.has_risk = this.maintenance.has_risk;
        this.mainDetalle.status_id = this.maintenance.case.status_id;
        this.mainDetalle.user_to_assign_id = this.maintenance.case.user_to_assign_id;
        this.mainDetalle.institute_id = this.maintenance.case.institute_id;
        this.mainDetalle.solution = this.maintenance.solution;
        this.mainDetalle.type_incident = this.maintenance.type_incident;
        this.mainDetalle.site = this.maintenance.site;
        this.mainDetalle.score = this.maintenance.score;
        this.mainDetalle.description_incident = this.maintenance.description_incident;
      } else {
        console.log('error');
      }
    });
  }

  //formato de fech

  formatDate(dateString: string): string {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const date = new Date(dateString);
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${day} de ${months[monthIndex]} de ${year}`;
  }


  formatDateTime(dateTimeString: string): string {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const date = new Date(dateTimeString);

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const paddedMinutes = (minutes < 10) ? '0' + minutes : minutes;

    return `${day} de ${months[monthIndex]} de ${year} - Hora: ${hours}:${paddedMinutes}`;
  }


  submitStars(){
    this.mainDetalle.score = this.stars.toString();
  const totalScore = {
    maint_id: this.mainDetalle.id,
    score: this.stars
  };
  this._serMaint.updateScore(this.token, totalScore).subscribe(resp => {
    console.log(resp);
    this._router.navigate(['/gratitude/']);
  
  });
}
  }

