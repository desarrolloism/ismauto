import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';
import { CasesService } from '../../services/cases.service';
import { MaintenanceService } from '../../services/maintenance.service';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  avatar: string = '';
  name: string = '';
  email: string = '';
  last_name: string = '';
  //variable quemada
  percentage: number = 70;
  public token: any;
  public chart: any;

  //claves para respuestas de la api
  public responseApi: any;
  public responseCases: any;
  public responseTotals: any;

  //muestra si es admin
  // isAdmin: boolean = false;


  constructor(private _casesServ: CasesService,
    private _router: Router,
    private _mainServ: MaintenanceService,

  ) {
    this.token = localStorage.getItem('token');
    this.getCases();
  // this.getIsAdmin();

  }
 ngOnInit() {
  this.generateChart1();
  // this.generateChart2();
  this.getAvatar();
}

  //verifica si es admin o no
  // getIsAdmin(){
  //   this.isAdmin = JSON.parse(localStorage.getItem('isAdmin')|| 'false');
  //   console.log(`es admin = ${this.isAdmin}`);
  // }


//caputra los datos del usuario
  getAvatar(){
    const userData = JSON.parse(localStorage.getItem('userData')|| '{}');
    this.avatar = userData.avatar;
    this.name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    // console.log(this.avatar);
    // console.log(this.name);
    // console.log(this.last_name);
    // console.log(this.email);
  }


  getCases() {

    this._casesServ.casesAll(localStorage.getItem('token')).subscribe(
      response => {
        this.responseApi = response;
        if (this.responseApi.status == 'OK') {
          this.responseCases = this.responseApi.cases;
          this.responseTotals = this.responseApi.totals;
          console.log(this.responseTotals);
          // console.log(this.responseCases);
          this.generateChart();

        }
      }
    )
  }


  getTotalStatus() {
    if (this.responseTotals && this.responseTotals.length > 0) {
      const total = this.responseTotals.find((item: { id: number; }) => item.id === 4);
      return total ? total.total_status : 0;
    } else {
      return 0;
    }
  }
  

  //barras quemadas

  generateChart1() {
    const labels = ['1 Estrella', '2 Estrellas', '3 Estrellas', '4 Estrellas', '5 Estrellas'];
    const data = [2, 4, 5, 8, 10]; // Datos ficticios para las barras
    const colors = [
      '#ff9e18',
      '#ab0a3d',
      '#9e28b5',
      '#0a1f8f',
      '#65b2e8',
      '#898b8d',
      'limegreen',
    ];

    this.chart = new Chart("MyOtherChart", { // Cambiado el ID a "MyOtherChart"
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: "",
            data: data,
            backgroundColor: colors
          }
        ]
      },
      options: {
        maintainAspectRatio: false, // Desactiva el mantenimiento del aspecto para permitir un tamaño personalizado
        responsive: true, // Permite que el gráfico se ajuste al tamaño del contenedor
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }



  // generateChart2() {
  //   const labels = ['INICIADO', 'SOLICITADO', 'EN PROCESO', 'EN ESPERA', 'ENTREGADO', 'FINALIZADO'];
  //   const data = [5, 2, 4, 7, 3, 1]; // Datos ficticios para las barras

  //   const colors = [
  //     '#ff9e18',
  //     '#ab0a3d',
  //     '#9e28b5',
  //     '#0a1f8f',
  //     '#65b2e8',
  //     '#898b8d',
  //     'limegreen',
  //   ];

  //   this.chart = new Chart("MyOtherChart2", { // Cambiado el ID a "MyOtherChart"
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       datasets: [
  //         {
  //           label: "",
  //           data: data,
  //           backgroundColor: colors
  //         }
  //       ]
  //     },
  //     options: {
  //       maintainAspectRatio: false, // Desactiva el mantenimiento del aspecto para permitir un tamaño personalizado
  //       responsive: true, // Permite que el gráfico se ajuste al tamaño del contenedor
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });
  // }




  //fin barras quemadas




  generateChart() {

    // console.log(this.responseTotals);

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
        //llama al evento click para redireccionar a otra ruta
        onClick: (evt, activeElements) => {
          if (activeElements.length > 0) {
            // Obtener el índice del elemento seleccionado
            const clickedIndex = activeElements[0].index;
            // Obtener el nombre del elemento seleccionado
            const selectedLabel = this.chart.data.labels[clickedIndex];
            // Redirigir a la ruta deseada
            this.redirectToRoute(selectedLabel);
          }
        }
      },
    });
  }

  // Método para redirigir a otra ruta según el elemento seleccionado
  redirectToRoute(selectedLabel: string) {
    // Aquí puedes hacer lo que necesites con la etiqueta seleccionada antes de redirigir
    console.log('Elemento seleccionado:', selectedLabel);
    // Redirigir a la ruta deseada, por ejemplo:
    this._router.navigate(['/cases', selectedLabel]);
  }

  logout() {
    if (window.confirm('¿Está seguro de que desea salir?')) {
      localStorage.clear();
      this._router.navigate(['/login']);
    }
  }

}
