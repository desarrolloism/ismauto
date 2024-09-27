import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CitaDataService } from '../../services/cita-data.service';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fechas',
  templateUrl: './fechas.component.html',
  styleUrls: ['./fechas.component.css']
})
export class FechasComponent {
  selectedDate: Date | null = null;
  selectedTime: string = '';
  availableTimes: string[] = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
  confirmacionChecked: boolean = false;
  citaInfo: any = {};
  subjectInfo: any;
  isLoading: boolean = false;
  finish:boolean = false;

  constructor(private citaDataService: CitaDataService, private _router: Router) {}

  ngOnInit() {
    this.citaDataService.getCitaData().subscribe(data => {
      this.citaInfo = data;
      console.log(this.citaInfo);
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
      this.isLoading = true;
      const citaCompleta = {
        subject: this.subjectInfo,
        start_date_time: this.generateDateTime(this.selectedDate, this.selectedTime),
        end_date_time: this.generateEndDateTime(this.selectedDate, this.selectedTime),
        location_display_name: this.citaInfo.campus,
        attendees: [
          {
            emailAddress: {
              address: this.citaInfo.PersonalCorreo,
              name: this.citaInfo.solicitante
            },
            type: 'required'
          }
        ]
      };

      console.log("Selected Date:", this.selectedDate);
      console.log("Selected Time:", this.selectedTime);
      console.log("Cita Info:", this.citaInfo);
      console.log("Cita Completa:", citaCompleta);
      console.log("Email:",this.citaInfo.email);

      this.citaDataService.createCita(citaCompleta).subscribe({
        complete: () => {
          this.isLoading = false,
          this.finish = true
        },
        next: () => {this.confirmationAlert(),
          setTimeout(() => {
            this._router.navigate(['/usuario']);
          },5000)
        },
        error: (err) => this.errorAlert(err)
      });
    }
  }

  generateDateTime(date: Date, time: string): string {
    const [hours, minutes] = time.split(':');
    const dateTime = new Date(date);
    dateTime.setHours(parseInt(hours), parseInt(minutes));
    return dateTime.toISOString();
  }

  generateEndDateTime(date: Date, time: string): string {
    const [hours, minutes] = time.split(':');
    const endDateTime = new Date(date);
    endDateTime.setHours(parseInt(hours) + 1, parseInt(minutes)); // Suponiendo que la cita dura 1 hora
    return endDateTime.toISOString();
  }

  confirmationAlert(){
    
    Swal.fire({
      title: "Cita creada con éxito!",
      text: "Un mensaje de confirmación fue enviado a tu correo!",
      icon: "success"
    });
  }

  errorAlert(error: any) {
    Swal.fire({
      title: "Error",
      text: `Hubo un problema creando la cita: ${error.message}`,
      icon: "error"
    });
  }
}
