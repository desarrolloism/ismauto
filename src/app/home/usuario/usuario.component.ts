import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CitaDataService } from '../../services/cita-data.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  usuario = { nombre: 'Jean Breidy Coox Maldonado' };
  campuses = ['North', 'Quito', 'WEST'];
  selectedCampus: string = '';

  constructor(private router: Router, private citaDataService: CitaDataService) {}

  continueToCita() {
    this.citaDataService.updateCitaData({ solicitante: this.usuario.nombre });
    this.citaDataService.updateCitaData({ campus: this.selectedCampus });
    this.router.navigate(['/tipo-cita']);
  }

}
