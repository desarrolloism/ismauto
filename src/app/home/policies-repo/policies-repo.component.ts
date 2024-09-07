import { Component, OnInit } from '@angular/core';
import { RepoService } from '../../services/repo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-policies-repo',
  templateUrl: './policies-repo.component.html',
  styleUrl: './policies-repo.component.css'
})
export class PoliciesRepoComponent {


  token = localStorage.getItem('token');
  category = 3;
  repo: any[] = [];
  selectedTipo: any = null;
  documentId: number = 0; 
  isloading: boolean = false;

  constructor(
    private _repo: RepoService, 
    private snackBar: MatSnackBar) { }

  ngOnInit(){
    this.allRepo();
  } 

  //obtiene la info del repo

  allRepo(){
    this._repo.getRepository(this.token, this.category).subscribe((resp: any) => {
      this.repo = resp.categoria.tipos;
      console.log('nuevo repo', this.repo);
    });
  }

  //filtra por tipo
  onSelectTipo(tipo: any) {
    this.selectedTipo = tipo;
  }


  //verifica si esta cerrado o abierto el collapse
  selectTipo(tipo: any) {
    if (this.selectedTipo === tipo) {
      this.selectedTipo = null;
    } else {
      this.selectedTipo = tipo;
    }
  }

  //descarga el documento
  dowloadDocument(id: any, nombreDoc:any, versionDoc:any, is_automatic:boolean, url:any) {
    console.log(id);
    console.log(nombreDoc);
    console.log(versionDoc);
    console.log(is_automatic);
    this.isloading = true;
    if(is_automatic == true ){
    this.isloading = false;
      window.open(url, '_blank');
    }else{
      this._repo.downloadRepo(this.token, id).subscribe((resp: Blob) => {
        this.isloading = false;
        const filename = `${nombreDoc} - ${versionDoc}`;
        saveAs(resp, filename);
        console.log('Descarga completada:', resp);
      });
    }
    
  }
}
