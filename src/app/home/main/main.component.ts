import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';
import { CasesService } from '../../services/cases.service';
import { NotificationsService } from '../../services/notifications.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  //abre el menu de colecturi
  colecturiaExpanded: boolean = false;

  //variables para info del usuario
  avatar: string = '';
  name: string = '';
  email: string = '';
  last_name: string = '';
  fullname: string = '';

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

  userPass = {
    new_password: '',
    confirm_password: '',
    phone_number: ''
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _casesServ: CasesService,
    private _router: Router,
    private _notiServ: NotificationsService,
    private _formBuilder: FormBuilder
  ) {
    this.token = localStorage.getItem('token');
    this.getCases();
  }

  ngOnInit() {
    this.getNoti();
    this.getAvatar();
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
          this.generateChart();
        }
      }
    )
  }

  //abre el menu de colecturia
  toggleColecturia() {
    this.colecturiaExpanded = !this.colecturiaExpanded;
  }

  getTotalStatus() {
    if (this.responseTotals && this.responseTotals.length > 0) {
      const total = this.responseTotals.find((item: { id: number; }) => item.id === 4);
      return total ? total.total_status : 0;
    } else {
      return 0;
    }
  }

  generateChart() {
    let aspectRatio = 2.5;
    if (window.innerWidth < 576) { // Por ejemplo, si el ancho de la ventana es menor que 576px (el punto de corte para dispositivos móviles en Bootstrap)
      aspectRatio = 1.5; // Cambia el aspectRatio para dispositivos móviles
    }
    const labels = this.responseTotals.map((item: any) => item.name);
    const salesData = this.responseTotals.map((item: any) => item.total_status);
    // const profitData = this.responseTotals.map((item: any) => item.total_status);
    const colors = [
      '#ff9e18',
      '#ab0a3d',
      '#9e28b5',
      '#0a1f8f',
      '#65b2e8',
      '#898b8d',
      'limegreen',
    ];

    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Total Casos",
            data: salesData,
            backgroundColor: colors
          },
        ]
      },
      options: {
        aspectRatio: aspectRatio,
        onClick: (evt, activeElements) => {
          if (activeElements.length > 0) {
            const clickedIndex = activeElements[0].index;
            const selectedLabel = this.chart.data.labels[clickedIndex];
            this.redirectToRoute(selectedLabel);
          }
        }
      },
    });
  }

  // Método para redirigir a otra ruta según el elemento seleccionado
  redirectToRoute(selectedLabel: string) {
    this._router.navigate(['/cases', selectedLabel]);
  }

  logout() {
    if (window.confirm('¿Está seguro de que desea salir?')) {
      localStorage.clear();
      this._router.navigate(['/login']);
    }
  }

  maintenanceReport() {
    window.open('https://lookerstudio.google.com/embed/reporting/8077023e-eb9d-4f9d-89bd-cee1846baa4c/page/HyMqD', '_blank');
  }


  onKeyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // Si el carácter ingresado no es un número, cancelamos el evento de pulsación
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


}
