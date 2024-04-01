import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';
import { CasesService } from '../../services/cases.service';

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



  constructor(private _casesServ: CasesService, private _router: Router) {
    this.token = localStorage.getItem('token');
    // console.log(this.token);
    this.getCases();
  }

  ngOnInit() {

  }

  getCases() {

    this._casesServ.casesAll(localStorage.getItem('token')).subscribe(
      response => {
        this.responseApi = response;
        if (this.responseApi.status == 'OK') {
          console.log(response);
          this.responseCases = this.responseApi.cases;
          this.responseTotals = this.responseApi.totals;
          // console.log(this.responseCases);
          // console.log(this.responseTotals);
          this.generateChart();
        } else {
          console.log('no existe datos');
        }

      }

    )
  }

  generateChart() {

    console.log(this.responseTotals);

    const labels = this.responseTotals.map((item: any) => item.name);
    const salesData = this.responseTotals.map((item: any) => item.total_status);
    // const profitData = this.responseTotals.map((item: any) => item.total_status);

    this.chart = new Chart("MyChart", {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Total Casos",
            data: salesData,
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: salesData,
            backgroundColor: 'limegreen'
          },
          {
            label: "Profit",
            data: salesData,
            backgroundColor: 'pink'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,

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
      }
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
    localStorage.clear();
    this._router.navigate(['/login']);
  }

}
