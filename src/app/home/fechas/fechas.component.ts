// fechas.component.ts
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import { CitaDataService } from '../../services/cita-data.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-fechas',
  templateUrl: './fechas.component.html',
  styleUrls: ['./fechas.component.css']
})
export class FechasComponent {
  selectedDate: Date | null = null;
  selectedTime: string = '';
  availableTimes: string[] = ['08:00','09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
  confirmacionChecked: boolean = false;
  citaInfo: any = {};

  constructor(private dialog: MatDialog, private citaDataService: CitaDataService) {}

  ngOnInit() {
    this.citaDataService.getCitaData().subscribe(data => {
      this.citaInfo = data;
    });
  }

  dateFilter = (date: Date | null): boolean => {
    const day = (date || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  onDateSelected(event: Date | null) {
    this.selectedDate = event;
  }

  confirmarCita() {
    if (this.selectedDate && this.selectedTime && this.confirmacionChecked) {
      const citaCompleta = {
        ...this.citaInfo,
        fecha: this.selectedDate,
        hora: this.selectedTime
      };
      this.citaDataService.updateCitaData(citaCompleta);
      this.confirmationAlert();
    }
  }

  confirmationAlert(){
    Swal.fire({
      title: "Cita creada con éxito!",
      text: "Un mensaje de confirmación fue enviado a tu correo!",
      icon: "success"
    });
  }

}
