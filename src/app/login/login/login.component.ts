import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  responseUrl: any;
  loginUrl: any;

  user = {
    username: '',
    password: ''
  }

  constructor(private _loginService: LoginService, private _router: Router) { }

  ngOnInit() {
    // Verifica si la página ya se ha recargado
    if (!sessionStorage.getItem('pageReloaded')) {
      sessionStorage.setItem('pageReloaded', 'true');
      location.reload();
    } else {
      // Elimina la clave para futuras visitas
      sessionStorage.removeItem('pageReloaded');
    }
  }

  // onSubmit(){
  //   this._loginService.login(this.user.username, this.user.password).subscribe(resp =>{
  //     this.responseUrl =  resp;
  //     // console.log(this.responseUrl);
  //     if(this.responseUrl.status == 'OK'){
  //       // console.log(this.responseUrl.data.token);

  //       localStorage.setItem('token', this.responseUrl.data.token);
  //       localStorage.setItem('userData', JSON.stringify(this.responseUrl.data));
  //       this._router.navigate(['/main']);
  //     } else if( this.responseUrl.status == 'Error') {
  //       alert('El usuario o contraseña son incorrectos');
  //     } else {
  //       alert('Usuario o contraseña incorrectos');
  //     }
  //   })
  // }

  onSubmit() {
    this._loginService.login(this.user.username, this.user.password).subscribe(
      resp => {
        this.responseUrl = resp;
        // console.log(this.responseUrl);
        if (this.responseUrl.status === 'Created') {
          alert(this.responseUrl.message + ' por favor inicia sesión nuevamente');
          window.location.reload();
        } else if (this.responseUrl.status === 'OK') {
          localStorage.setItem('token', this.responseUrl.data.token);
          localStorage.setItem('userData', JSON.stringify(this.responseUrl.data));
          this._router.navigate(['/main']);
        } else if (this.responseUrl.status === 'Error') {
          alert(this.responseUrl.message);
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      },
      error => {
        if (error.status === 401) {
          alert('Usuario o contraseña incorrectos');
        } else {
          alert('Error al iniciar sesión');
        }
      }
    );
  }


}
