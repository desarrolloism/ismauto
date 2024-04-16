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

  public token: any;
  public chart: any;

  //claves para respuestas de la api
  public responseApi: any;
  public responseCases: any;
  public responseTotals: any;
  public user: any;


  constructor(private _casesServ: CasesService,
    private _router: Router,
    private _serMaint: MaintenanceService,
    private _userService: UsersService

  ) {
    this.token = localStorage.getItem('token');
    this.getCases();
  }


  getCases() {

    this._casesServ.casesAll(localStorage.getItem('token')).subscribe(
      response => {
        this.responseApi = response;
        if (this.responseApi.status == 'OK') {
          this.responseCases = this.responseApi.cases;
          this.responseTotals = this.responseApi.totals;
          this.generateChart();
        }

      }

    )
  }

  
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
      type: 'pie',
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
