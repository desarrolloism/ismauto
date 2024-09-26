import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';
import { CasesService } from '../../services/cases.service';
import { NotificationsService } from '../../services/notifications.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { UsersService } from '../../services/users.service';
import { MockapiService } from '../../services/mockapi.service';
import { RepoService } from '../../services/repo.service';

declare var bootstrap: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  //abre el menu de colecturi
  colecturiaExpanded: boolean = false;

  //abre menu repo
  repoExpanded: boolean = false;

  //variables para info del usuario
  avatar: string = '';
  name: string = '';
  email: string = '';
  last_name: string = '';
  fullname: string = '';
  is_Boss: any;

  //variable quemada
  percentage: number = 70;
  public token: any;
  public chart: any;

  //claves para respuestas de la api
  public responseApi: any;
  public responseCases: any;
  public responseTotals: any;


  //variables para cambiar de contrasena 
  urlAPI: any;
  changePass: boolean = false;
  urlPass: any;
  phone: any;
  dni: any;

  userPass = {
    new_password: '',
    confirm_password: '',
    phone_number: ''
  }

  Mock: any;

  //variable para obtener navbar repo
  navRepo: any[] = [];
  product: any;

  constructor(private _casesServ: CasesService,
    private _router: Router,
    private _notiServ: NotificationsService,
    private _formBuilder: FormBuilder,
    private _dash: DashboardService,
    private _userServ: UsersService,
    private _mockapi: MockapiService,
    private _repo: RepoService
  ) {
    this.token = localStorage.getItem('token');
    this.getCases();
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  //servicio fake para obtener la informacion del usuario

  getFake() {
    this._mockapi.getFakeUsers().subscribe(resp => {
      this.Mock = resp;
      // console.log('mock respo es', this.Mock);
    })
  }


  //servicio fake para obtener la informacion del usuario




  ngOnInit() {
    this.getNoti();
    this.getAvatar();
    this.getBoos();
    this.navBar();
    this.productData();
    // this.getFake();
  }

  getNoti() {
    this._notiServ.noti().subscribe(resp => {
      this.urlAPI = resp;
      this.changePass = this.urlAPI.change_password;
      this.avatar = this.urlAPI.data.avatar;
      this.name = this.urlAPI.data.first_name;
      this.last_name = this.urlAPI.data.last_name;
      this.email = this.urlAPI.data.email;
      this.phone = this.urlAPI.data.phone_number;
      if (this.changePass) {
        this.showModal();
      }
    });
  }

  showModal() {
    const modalElement = document.getElementById('staticBackdrop');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }


  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  //caputra los datos del usuario
  getAvatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.avatar = userData.avatar;
    this.name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    this.fullname = this.name + ' ' + this.last_name
    this.dni = userData.dni;
    // console.log('datos de usuario', userData);z
  }

  getCases() {

    this._casesServ.casesAll(localStorage.getItem('token')).subscribe(
      response => {
        this.responseApi = response;
        // console.log(this.responseApi);
        if (this.responseApi.status == 'OK') {
          this.responseCases = this.responseApi.cases;
          // console.log('casos', this.responseCases);

          this.responseTotals = this.responseApi.totals;

          this.getAvatar();
          // this.generateChart();
        }
      }
    )
  }

  //abre el menu de colecturia
  toggleColecturia() {
    this.colecturiaExpanded = !this.colecturiaExpanded;
  }

  //abre el menu de repo
  toggleRepo() {
    this.repoExpanded = !this.repoExpanded;
  }

  getTotalStatus() {
    if (this.responseTotals && this.responseTotals.length > 0) {
      const total = this.responseTotals.find((item: { id: number; }) => item.id === 4);
      return total ? total.total_status : 0;
    } else {
      return 0;
    }
  }

  //mata al token
  killToken() {
    console.log('toquen para destruir', this.token);
    this._userServ.killToken(this.token).subscribe((resp: any) => {
      console.log('token destruido', resp);
    });
  }

  // Método para redirigir a otra ruta según el elemento seleccionado
  redirectToRoute(selectedLabel: string) {
    this._router.navigate(['/cases', selectedLabel]);
  }

  logout() {
    if (window.confirm('¿Está seguro de que desea salir?')) {
      localStorage.clear();
      this.killToken();
      setTimeout(() => {
        this._router.navigate(['/login']);
      }, 1000)
    }
  }

  maintenanceReport() {
    window.open('https://lookerstudio.google.com/embed/reporting/8077023e-eb9d-4f9d-89bd-cee1846baa4c/page/HyMqD', '_blank');
  }


  onKeyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  isPhoneNumberPresent() {
    return !!this.phone;
  }

  onSubmit(form: NgForm) {

    if (form.invalid || !this.userPass.phone_number) {
      return;
    }

    if (this.userPass.new_password !== this.userPass.confirm_password) {
      console.log(this.userPass);
      console.log(this.isPhoneNumberPresent());
      alert('Las contraseñas no coinciden.');
      return;
    }

    const formattedPhoneNumber = this.isPhoneNumberPresent() ? `593${this.userPass.phone_number}` : this.userPass.phone_number;

    this._notiServ.changePass(this.userPass.new_password, this.userPass.confirm_password, formattedPhoneNumber)
      .subscribe(resp => {
        this.urlPass = resp;
        if (this.urlPass.status === 'OK') {
          alert('¡Contraseña cambiada con éxito!');
          window.location.reload();
        }
      });
  }

  onConfirmPass(event: any) {
    console.log(event);
    // this.userPass.confirm_password = event.target.value;
    // console.log('confirm pass', this.userPass.confirm_password);
  }

  //opbtiene si es ejfe o no
  getBoos() {
    this._userServ.BoosLogin(this.token, this.dni).subscribe(
      (resp: any) => {
        this.is_Boss = resp.data;
        // console.log('es jefe:', this.is_Boss);
      }
    )
  }


  //obtiene la nav para repo
  navBar() {
    this._repo.getNav(this.token).subscribe((resp: any) => {
      this.navRepo = resp.data;
      // console.log('resp de nav', this.navRepo);
    });
  }

  isInternalLink(id: number): boolean {
    return id !== 6 && id !== 7;
  }

  getRouterLink(id: number): string {
    switch (id) {
      case 2: return '/iso';
      case 3: return '/politicas-y-normativas';
      case 4: return '/documentos';
      default: return '/';
    }
  }

  getExternalLink(id: number): string {
    switch (id) {
      case 6: return 'https://help.ism.edu.ec/';
      default: return '#';
    }
  }

  openExternalLink(id: number): void {
    window.open(this.getExternalLink(id), '_blank', 'noopener,noreferrer');
  }


  productData() {
    this._userServ.showData().subscribe((resp: any) => {
      this.product = resp.data;
      console.log('mis productos', this.product);
    })
  }


  gotoPage() {
    if (this.token) {
      const encodedToken = encodeURIComponent(this.token);
      // const url = `http://192.168.48.241:36171/main?token=${encodedToken}`;
      const url = `http://localhost:40221/main?token=${encodedToken}`;

      window.open(url, '_blank');
    } else {
      console.error('No se encontró un token en el localStorage');
    }
  }

}
