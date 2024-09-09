import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CitaDataService } from '../../services/cita-data.service';

@Component({
  selector: 'app-cedula',
  templateUrl: './cedula.component.html',
  styleUrl: './cedula.component.css'
})
export class CedulaComponent {
  cedula: string = '';

  constructor(private router: Router, private citaDataService: CitaDataService) {}

  submitCedula() {
    this.citaDataService.updateCitaData({ solicitante: this.cedula });
    this.router.navigate(['/usuario']);
  }
}