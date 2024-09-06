import { Component } from '@angular/core';

@Component({
  selector: 'app-normativa-iso',
  templateUrl: './normativa-iso.component.html',
  styleUrl: './normativa-iso.component.css'
})
export class NormativaIsoComponent {

  downloadPortada(){
    window.open('../../../assets/files/statics/NORMA-INTERNACIONAL-ISO-9001-2015.pdf');
  } 

}
