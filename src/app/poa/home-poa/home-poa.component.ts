import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { PoaService } from '../../services/poa.service';


@Component({
  selector: 'app-home-poa',
  templateUrl: './home-poa.component.html',
  styleUrl: './home-poa.component.css'
})
export class HomePoaComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _router: Router,
    private _formBuilder: FormBuilder,
    private _poaService: PoaService
  ) { }


}
