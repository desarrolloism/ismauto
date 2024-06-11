import { Component, Input } from '@angular/core';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-stud-matrix',
  templateUrl: './stud-matrix.component.html',
  styleUrl: './stud-matrix.component.css'
})
export class StudMatrixComponent {
  @Input() son_id: number | undefined;

  ngOnInit() {
    console.log('son_id:', this.son_id);
  }


}
