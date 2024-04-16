import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  responseurl: any;
  loginUrl: any;

  user = {
    username: '',
    password: ''
  }


  constructor(private _loginServ: LoginService, private _router: Router) { }

  onSubmit() {

    this._loginServ.login(this.user.username, this.user.password).subscribe(resp => {
      this.responseurl = resp;
      console.log(resp);
      if (this.responseurl.status == 'OK') {
        localStorage.setItem('token', this.responseurl.data.token);
        this._router.navigate(['/main']);
      } else {
        alert('Usuario o Contraseña incorrectos');
      }
    })

  }

}
