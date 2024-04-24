import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private _router: Router) {}

  avatar: string = '';
  name: string = '';
  email: string = '';
  last_name: string = '';

  ngOnInit() {
    this.getAvatar();
  }

  logout() {
    if(window.confirm('¿Está seguro de que desea salir?')){
      localStorage.clear();
      this._router.navigate(['/login']);
    }
  }

  getAvatar(){
    const userData = JSON.parse(localStorage.getItem('userData')|| '{}');
    this.avatar = userData.avatar;
    this.name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    // console.log(this.avatar);
    // console.log(this.name);
    // console.log(this.last_name);
    // console.log(this.email);
  }

}
