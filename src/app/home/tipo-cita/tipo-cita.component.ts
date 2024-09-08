import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CitaDataService } from '../../services/cita-data.service';

@Component({
  selector: 'app-tipo-cita',
  templateUrl: './tipo-cita.component.html',
  styleUrl: './tipo-cita.component.css'
})
export class TipoCitaComponent {
  tipoPersonal: string = '';
  nivelEducativo: string = '';
  

  constructor(private router: Router, private citaDataService: CitaDataService) {}

  continueToPersonal() {
    this.citaDataService.updateCitaData({
      tipoPersonal: this.tipoPersonal,
      nivel: this.nivelEducativo
    });
    this.router.navigate(['/personal']);
  }
}
