import { Component, OnInit } from '@angular/core';
import { PoaService } from '../../services/poa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-started-deps',
  templateUrl: './not-started-deps.component.html',
  styleUrl: './not-started-deps.component.css'
})
export class NotStartedDepsComponent {

  token = localStorage.getItem('token')
  notStartedPoa: any
  avatar: string = '';
  name: string = '';
  email: string = '';
  last_name: string = '';
  fullname: string = '';
  is_admin: boolean = false;
  dni: string = '';


  constructor(private poaService: PoaService) { }


  ngOnInit() {
    this.getAvatar();
    this.depsNotStarted();
  }

  depsNotStarted() {
    this.poaService.getNotStartedDeps(this.token).subscribe((resp: any) => {
      this.notStartedPoa = resp.data;
      // console.log('dep que no han iniciado', this.notStartedPoa);
    });
  }

  getAvatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log(userData);
    this.avatar = userData.avatar;
    this.name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    this.fullname = this.name + ' ' + this.last_name
    this.dni = userData.dni;
    console.log(this.dni);
    // console.log(this.name);
    console.log('sdjgf', this.fullname);
    // console.log(this.email);
  }


}
