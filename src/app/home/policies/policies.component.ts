import { Component, OnInit } from '@angular/core';
import { RepoService } from '../../services/repo.service';
import { Router } from '@angular/router';
import { windowWhen } from 'rxjs';


@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.css'
})
export class PoliciesComponent {

  constructor(
    private _router: Router,
    private _repo: RepoService
  ) { }

  ngOnInit(){

  }


  //metodo para descargar poa
  downloadPortada(){
    window.open('../../../assets/files/statics/Portada-Politicas-V-2024.docx');
  } 
}
