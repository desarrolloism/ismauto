import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validatetoken',
  templateUrl: './validatetoken.component.html',
  styleUrl: './validatetoken.component.css'
})
export class ValidatetokenComponent {
  token: any;

  constructor( private _router: Router ) {
    if(!localStorage.getItem('token')){
      this._router.navigate(['/login']);
    }
  }

}
