import { Component, OnInit } from '@angular/core';
import { ScholarshipsService } from '../../services/scholarships.service';

@Component({
  selector: 'app-myuser',
  templateUrl: './myuser.component.html',
  styleUrl: './myuser.component.css'
})
export class MyuserComponent {


  constructor(private _scholarshipsService: ScholarshipsService) { }

  //variable para datos de la API
  responseUrl: any;

  //variables para el texto de las recomendaciones
  recomendations1 = [
    'Todos los beneficiados de becas y descuentos ISM obligatoriamente deberán asistir a todas las capacitaciones que el ISM brinda a través del DECE en el programa de Escuela de Formación Continua, y cumplir los acuerdos firmados en la carta compromiso.',
    'Los padres y colaboradores del ISM, beneficiarios de esta política se comprometen a colaborar activamente en las actividades a favor de la Fundación Letra para Todos, en la campaña navideña, etc.',
    'Es indispensable que los datos consignados en la solicitud de becas/descuentos y documentos de respaldo deben ser estrictamente apegados a la verdad, en consideración de que son confidenciales. El presentar información falsa dará evidencia de mala fe y causará la cancelación de becas y descuentos, aun cuando ya hayan sido otorgados.'
  ];

  recomendations2 = [
    'El plazo máximo de la presentación de la solicitud de beca y documentos de respaldo completos inicia el 1 de junio y termina el 30 de julio de cada año lectivo.',
    'Todas las becas, descuentos que se otorgan son por un año lectivo.',
    'Todos los padres de familia beneficiarios de beca firmarán una carta compromiso en trabajo social de la institución.',
    'Todos los padres de familia deberán pagar dentro de los primeros 10 días de cada mes, los valores correspondientes a pensión escolar.'
  ];

  recomendation3 = [
    ' Descuento del 7% por pago todo el año escolar en efectivo. ',
    ' Descuento por hermanos:  2 hermanos 5% cada estudiante - 3 hermanos 10% cada estudiante',
    'Descuento del 7% a cada hijo de ex estudiantes de la institución.'
  ];

  text1 = this.recomendations1[0];
  text2 = this.recomendations2[0];
  text3 = this.recomendation3[0];
  indTexto1 = 0;
  indTexto2 = 0;
  indTexto3 = 0;

  ngOnInit() {
    setInterval(() => {
      this.cambiarTexto();
    }, 7000);
    setInterval(() => {
      this.cambiarTexto2();
    }, 7000);
    setInterval(() => {
      this.cambiarTexto3();
    }, 7000);


  }

  cambiarTexto() {
    this.text1 = this.recomendations1[this.indTexto1];
    this.indTexto1 = (this.indTexto1 + 1) % this.recomendations1.length;
  }

  cambiarTexto2() {
    this.text2 = this.recomendations2[this.indTexto2];
    this.indTexto2 = (this.indTexto2 + 1) % this.recomendations2.length;

  }

  cambiarTexto3() {
    this.text3 = this.recomendation3[this.indTexto3];
    this.indTexto3 = (this.indTexto3 + 1) % this.recomendation3.length;
  }

  cedulaPadre = {
    cedula: ''
  };

  datos: string = '';

  email: any;
  name: any;


  OnInit() {
  }

  onSubmit() {
    this._scholarshipsService.getCi(this.cedulaPadre.cedula).subscribe(
      resp => {
        try {
          this.responseUrl = resp;
          if (this.responseUrl.status == 'OK') {
            this.datos = this.responseUrl.data;
            this.email = this.responseUrl.data.email;
            this.name = this.responseUrl.data.name;
          } else {
            throw new Error('Usuario no encontrado');
          }
        } catch (error) {
          alert('Usted no cuenta como representante, por favor contáctese con atención al cliente');
        }
      }
    );
  }


}
