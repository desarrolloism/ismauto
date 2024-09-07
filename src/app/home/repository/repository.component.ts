import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RepoService } from '../../services/repo.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit, AfterViewInit {
  private selectedFile: File | null = null;
  token = localStorage.getItem('token');
  category = 2;
  allDocuments: any[] = [];
  filteredDocuments: any[] = [];
  searchTerm: string = '';
  documentId: number = 0;
  documentName: any;
  documentVersion: any;
  isLoading: boolean = false;
  showScrollButton = false;

  constructor(
    private _repo: RepoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }
  ngAfterViewInit() {
    const popoverTrigger = document.getElementById('popoverButton');
    const popover = new (window as any).bootstrap.Popover(popoverTrigger, {
      trigger: 'manual' // Para controlar el popover manualmente
    });

    // Mostrar el popover automáticamente
    popover.show();

    // Desaparecer después de 2 segundos
    setTimeout(() => {
      popover.hide();
    }, 2000);
  }

  ngOnInit() {
    this.getRepository();
  }

  //obtiene los documentos del repositorio
  getRepository() {
    this.isLoading = true; 
    this._repo.getRepository(this.token, this.category).subscribe(
      (resp: any) => {
        this.allDocuments = this.allDocs(resp.categoria.tipos);
        this.filteredDocuments = this.allDocuments;
        this.isLoading = false;
        // console.log('repo es', this.allDocuments);
      },
      (error) => {
        this.isLoading = false; 
        this.snackBar.open('Error al cargar los documentos, contacte con soporte técnico.', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

  //filtra los documentos por tipo y subtipo
  allDocs(tipos: any[]): any[] {
    let documents: any[] = [];
    tipos.forEach(tipo => {
      tipo.subtipos.forEach((subtipo: any) => {
        subtipo.documentos.forEach((documento: any) => {
          documents.push({
            ...documento,
            tipo: tipo.nombre_tipo,
            subtipo: subtipo.nombre_subtipos
          });
        });
      });
    });
    return documents;
  }

  //busca los documentos
  searchDocuments() {
    if (this.searchTerm.trim() !== '') {
      this.filteredDocuments = this.allDocuments.filter(doc =>
        doc.nombre_documentos.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doc.codigo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doc.tipo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doc.subtipo.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredDocuments = this.allDocuments;
    }
  }


  //obtiene el id del documento para luego descargarlo o redireccionar al proceso
  getDocumentId(id: any, nombreDoc:any, versionDoc:any, url:any, isAutomatic:boolean) {
    this.documentId = id;
    this.documentName = nombreDoc;
    this.documentVersion = versionDoc;

    if(isAutomatic == true ){
      window.open(url, '_blank');
    } else {
      this._repo.downloadRepo(this.token, this.documentId).subscribe((resp: Blob) => {
        const filename = `${this.documentName} - ${this.documentVersion}`;
        saveAs(resp, filename);
        // console.log('Descarga completada:', resp);
      }, (error) => {
        // console.error('Error al descargar el documento:', error);
        this.snackBar.open('Error al descargar el documento', 'Cerrar', {
          duration: 3000,
        });
      });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showScrollButton = scrollPosition > 300;
  }

  scrollToTop() {
    const documentsContainer = document.querySelector('.documents-container');
    if (documentsContainer) {
      documentsContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    console.log('Archivo seleccionado:', this.selectedFile);
  }

  codigo: string = 'DOC044343';
  nombre: string = '';

  uploadFile() {
    if (this.selectedFile && this.codigo && this.nombre) {
      const token = 'tu-token'; // Reemplaza con la lógica para obtener el token
      const idDocument = 45; // Reemplaza con el ID del documento correcto

      console.log('Subiendo archivo:', this.selectedFile.name);
      console.log('Código:', this.codigo);
      console.log('Nombre:', this.nombre);
      console.log('ID del documento:', this.documentId);

      this._repo.uploadFile(this.token, idDocument, this.nombre, this.codigo, this.selectedFile)
        .subscribe(
          response => {
            console.log('Archivo subido con éxito', response);
          },
          error => {
            console.error('Error al subir el archivo', error);
            if (error.error && error.error.error) {
              console.error('Mensaje de error del servidor:', error.error.error);
            }
          }
        );
    } else {
      console.log('Por favor, complete todos los campos y seleccione un archivo');
    }
  }
}

