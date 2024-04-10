import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private _router: Router) {}

  logout() {
    if(window.confirm('¿Está seguro de que desea salir?')){
      localStorage.clear();
      this._router.navigate(['/login']);
    }
  }

}
