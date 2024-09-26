import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RepoService } from '../../services/repo.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import { HostListener } from '@angular/core';
import Swal from 'sweetalert2';


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
  currentDocumentId: number | null = null;
  currentDocumentCode: string = '';
  nombre: string = '';
  email: any;
  isUpdating:boolean = false;
  showDocName: any ;
  showDocType: any ;
  versions:any;
  versionLoader = false;

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
    this.getAvatar();
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
    // console.log('Archivo seleccionado:', this.selectedFile);
  }

  prepareUpload(documentId: number, documentCode: string, documentName: string, Type: string) {
    this.currentDocumentId = documentId;
    this.currentDocumentCode = documentCode;
    this.showDocName = documentName;
    this.showDocType = Type;
    console.log('subir archivo. ID:', documentId, 'Código:', documentCode);
  }


  uploadFile() {
    
    if (this.selectedFile && this.nombre && this.currentDocumentId !== null) {
      // console.log('Subiendo archivo:', this.selectedFile.name);
      // console.log('Código:', this.currentDocumentCode);
      // console.log('Nombre:', this.nombre);
      // console.log('ID del documento:', this.currentDocumentId);
      this.isUpdating = true; 
      this._repo.uploadDocument(this.token, this.currentDocumentId, this.nombre, this.currentDocumentCode, this.selectedFile)
        .subscribe(
          response => {
            this.getRepository();
            this.isUpdating = false; 
            // console.log('Archivo subido con éxito', response);
            this.succesfullUpload();
            this.nombre = '';
          },
          error => {
            console.error('Error al subir el archivo', error);
            this.errorUpload();
          }
        );
    } else {
      this.infoUpload();
      // this.snackBar.open('Por favor, complete todos los campos y seleccione un archivo', 'Cerrar', { duration: 3000 });
    }
  }

  succesfullUpload() {
    Swal.fire({
      title: "Archivo actualizado exitosamente!",
      text: "El archivo fue actualizado exitosamente! Para visualizar los cambios debes recargar la pagina.",
      icon: "success"
    });
  }

  errorUpload() {
    Swal.fire({
      title: "Error al subir el archivo",
      text: "Por favor, intente nuevamente o contacte con soporte técnico.",
      icon: "error"
    });
  }

  infoUpload() {
    Swal.fire({
      title: "Complete todos los campos.",
      text: "Para evitar errores de carga usted debe agregar un nombre para el archivo, y seleccionar un archivo.",
      icon: "info"
    });
  }

  getAvatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.email = userData.email;

    // console.log('datos tammy',this.fullname);

  }


  //muestra versionamiento
  getVersioID(documentId: number){
    this.versionLoader = true;
    this.currentDocumentId = documentId;
    console.log('documento', this.currentDocumentId);
    this._repo.getVersions(this.token, this.currentDocumentId).subscribe((resp: any) => {
      this.versionLoader = false;
      this.versions = resp;
      console.log('versiones', this.versions);
    })

  }

}

