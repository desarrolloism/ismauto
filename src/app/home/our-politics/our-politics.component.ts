import { Component } from '@angular/core';

@Component({
  selector: 'app-our-politics',
  templateUrl: './our-politics.component.html',
  styleUrl: './our-politics.component.css'
})
export class OurPoliticsComponent {


  downloadPortada(){
    window.open('../../../assets/files/statics/Portada-Politicas-V-2024.docx');
  } 

}
