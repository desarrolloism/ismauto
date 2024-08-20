import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header-app',
  templateUrl: './header-app.component.html',
  styleUrl: './header-app.component.css'
})
export class HeaderAppComponent {


  constructor(private _router: Router) { }

  avatar: string = '';
  name: string = '';
  email: string = '';
  last_name: string = '';
  fullname: string = '';
  dataUser: any;

  //abre el menu de colecturi
  colecturiaExpanded: boolean = false;

  ngOnInit() {
    this.getAvatar();
  }

  logout() {
    if (window.confirm('¿Está seguro de que desea salir?')) {
      localStorage.clear();
      this._router.navigate(['/login']);
    }
  }

  getAvatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.dataUser = userData;
    this.avatar = userData.avatar;
    this.name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    this.fullname = this.name + ' ' + this.last_name
    console.log('datos tammy',this.fullname);

  }

  //quitar cuando este listo!
  nocreated() {
    alert('Por el momento no se encuentra disponible, gracias por su comprensión!');
  }
  //quitar cuando este listo!

  maintenanceReport() {
    window.open('https://lookerstudio.google.com/embed/reporting/8077023e-eb9d-4f9d-89bd-cee1846baa4c/page/HyMqD', '_blank');
  }

  //abre el menu de colecturia
  toggleColecturia() {
    this.colecturiaExpanded = !this.colecturiaExpanded;
  }
}
