import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css';

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

  reset_user ='';
  showPassword = false;
  email: string = '';
  changePass = '';
  isLoading = false;

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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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

  resetPassword() {
    this.isLoading = true;
    this._loginService.resetPass(this.reset_user, this.email).subscribe(
      (resp: any) => {
        // Si la respuesta es exitosa
        this.changePass = resp.status;
        if (resp.status == 'ok') {
          console.log(resp.status);
          console.log(this.changePass);
          this.isLoading = false;
          this.sweet();
        }
      },
      (error: any) => {
        // Si ocurre un error en la solicitud HTTP
        if (error.status === 401) {
          alert('El correo o usuario no coincide en la base de datos');
        } else if (error.status === 500) {
          alert('Ocurrio un error al reestablecer su contraseña, por favor intentelo de nuevo mas tarde o contacte con soporte técnico.');
        }
      }
    );
  }
  
  sweet(){
    Swal.fire({
      title: 'Éxito, tus credenciales han sido enviadas a tu correo institucional!',
      text: 'Contraseña reestablecida correctamente, revisa la bandeja de entrada de tu correo!',
      icon: 'success',
    })
  }
  
  validateNum(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
