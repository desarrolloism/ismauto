import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent {
  cedula: string = '';
  constructor(private router: Router) {}

  submitCedula() {
    // Aquí iría la lógica para verificar la cédula
    this.router.navigate(['/usuario']);
  }
}
