import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaintenanceService } from '../../services/maintenance.service';
import { Router } from '@angular/router';
import { ParamsService } from '../../services/params.service';
import { ScoreMailService } from '../../services/score-mail.service';

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
  paramsUrl: any;
  showInfo: boolean = false;
  scoreModuleUrl: string = 'score';

  constructor(
    private route: ActivatedRoute,
    private _serMaint: MaintenanceService,
    private _router: Router,
    private _paramsServ: ParamsService,
    private _scoreMailService: ScoreMailService
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.maintId = params['maintId'];
      // console.log(this.maintId);
      this.getDetail(this.maintId);
      // this.params1();
    });
  }

  getDetail(maintId: any) {
    this._serMaint.detail(this.token, maintId).subscribe(resp => {
      // console.log(resp);
      this.maintenanceUrl = resp;
      // console.log(this.maintenanceUrl);
      
      if (this.maintenanceUrl && this.maintenanceUrl.maintenance) {
        this.maintenance = this.maintenanceUrl.maintenance;
        this.mainDetalle.id = this.maintenance.id;
        this.mainDetalle.date_estimated_delivery = this.formatDate(this.maintenance.date_estimated_delivery);
        this.mainDetalle.priority = this.maintenance.priority;
        this.mainDetalle.has_risk = this.maintenance.has_risk;
        this.mainDetalle.status_id = this.maintenance.case.status_id.toString(); 
        this.mainDetalle.user_to_assign_id = this.maintenance.case.user_to_assign_id;
        this.mainDetalle.institute_id = this.maintenance.case.institute_id.toString();
        this.mainDetalle.solution = this.maintenance.solution;
        this.mainDetalle.type_incident = this.maintenance.type_incident;
        this.mainDetalle. description_incident = this.maintenance.description_incident;
        this.mainDetalle.site = this.maintenance.site;
        this.mainDetalle.score = this.maintenance.score.toString(); 
        this.mainDetalle.description_incident = this.maintenance.description_incident;
      } else {
        // console.log('error');
        alert('Error, contacte con el administrador');
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${year}-${month}-${day}`;
  }
  

  setRating(value: number) {
    this.stars = value;
    this.submitStars();
  }

  submitStars(){
    this.mainDetalle.score = this.stars.toString();
    const totalScore = {
      maint_id: this.mainDetalle.id,
      score: this.stars
    };
    this._serMaint.updateScore(this.token, totalScore).subscribe(resp => {
      // console.log(resp);
      
    });
  }

  endStatus(){
    this.mainDetalle.status_id = '9'; 
    // console.log(this.mainDetalle.status_id);

    this._serMaint.update(this.token, this.mainDetalle).subscribe(resp =>{
      let respuesta: any =  resp;
      this._router.navigate(['/gratitude/']);
    })
  }



}
