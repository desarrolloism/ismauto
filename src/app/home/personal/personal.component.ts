import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CitaDataService } from '../../services/cita-data.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})
export class PersonalComponent {
  personalDocente = [
    { id: 1, nombre: 'Ana García', cargo: 'Profesora de Matemáticas' },
    { id: 2, nombre: 'Carlos López', cargo: 'Profesor de Literatura' },
    { id: 3, nombre: 'María Rodríguez', cargo: 'Profesora de Ciencias' },
    { id: 4, nombre: 'Pedro Martínez', cargo: 'Profesor de Historia' }
  ];

  personalAdministrativo = [
    { id: 5, nombre: 'Aurora Gargurevich', cargo: 'Gerente general', correo: 'gerenciageneral@ism.edu.ec' },
    { id: 6, nombre: 'Francisco Velasco', cargo: 'Director Administrativo', correo:'gerenteti@ism.edu.ec' },
    { id: 7, nombre: 'Arturo Sarango', cargo: 'Jefe de Desarrollo e innovación', correo:'desarrollo@ism.edu.ec' },
    { id: 8, nombre: 'Hugo Espinosa', cargo: 'Asistente de desarrollo e innovación', correo:'asisdesarrollo3@ism.edu.ec' },
  ];

  personalMostrado: any[] = [];

  constructor(private router: Router, private citaDataService: CitaDataService) {}

  ngOnInit() {
    this.citaDataService.getCitaData().subscribe(data => {
      if (data.tipoPersonal === 'docente') {
        this.personalMostrado = this.personalDocente;
      } else if (data.tipoPersonal === 'administrativo') {
        this.personalMostrado = this.personalAdministrativo;
      }
    });
  }

  selectPersona(persona: any) {
    this.citaDataService.updateCitaData({ 
      personalNombre: persona.nombre,
      personalCargo: persona.cargo
    });
    this.router.navigate(['/fechas']);
  }
}
