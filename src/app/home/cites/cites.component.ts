import { Component } from '@angular/core';

@Component({
  selector: 'app-cites',
  templateUrl: './cites.component.html',
  styleUrl: './cites.component.css'
})
export class CitesComponent {

  token = localStorage.getItem('token');

  gotoPage() {
    if (this.token) {
      const encodedToken = encodeURIComponent(this.token);
      
      const url = `http://localhost:4200/nueva-pagina?token=${encodedToken}`;
      
      window.open(url, '_blank');
    } else {
      console.error('No se encontró un token en el localStorage');
    }
  }
}
