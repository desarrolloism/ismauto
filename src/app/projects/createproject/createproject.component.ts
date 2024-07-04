import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrl: './createproject.component.css'
})
export class CreateprojectComponent implements OnInit {
  token: any = localStorage.getItem('token');
  isLinear = true;
  projectNameFormGroup!: FormGroup;
  departmentFormGroup!: FormGroup;
  descriptionFormGroup!: FormGroup;
  endDateFormGroup!: FormGroup;
  campusFormGroup!: FormGroup;
  newProject: any;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>
  ) {

    this.dateAdapter.setLocale('es-ES');

  }

  ngOnInit() {
    this.projectNameFormGroup = this._formBuilder.group({
      project_name: ['', Validators.required]
    });
    this.departmentFormGroup = this._formBuilder.group({
      departament: ['', Validators.required]
    });
    this.descriptionFormGroup = this._formBuilder.group({
      description: ['', Validators.required]
    });
    this.endDateFormGroup = this._formBuilder.group({
      end_date: ['', Validators.required]
    });
    this.campusFormGroup = this._formBuilder.group({
      campus: ['', Validators.required]
    });

    const today = this.dateAdapter.today();
    this.endDateFormGroup.patchValue({
      end_date: today
    });
  }


  createNewProject() {
    const project = {
      project_name: this.projectNameFormGroup.value.project_name,
      departament: this.departmentFormGroup.value.departament,
      description: this.descriptionFormGroup.value.description,
      end_date: this.endDateFormGroup.value.end_date,
      state: 'INICIANDO',
      campus: this.campusFormGroup.value.campus
    };

    console.log('nombre ', project.project_name);
    console.log('departamento ', project.departament);
    console.log('descrip ', project.description);
    console.log('fecha ', project.end_date);
    console.log('estado ', project.state);
    console.log('campus ', project.campus);
    // console.log('token ', this.token);

    this._projectService.createProject(
      this.token,
      project.campus,
      project.end_date,
      project.project_name,
      project.description,
      project.departament,
      project.state,
    ).subscribe(
      resp => {
        console.log(resp);
        this.newProject = resp;
        if (this.newProject.status === 'ok') {
          alert('Proyecto creado exitosamente');
          this._router.navigate(['/proj-list']);
        }
      }
    );
  }
}