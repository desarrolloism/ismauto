import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signatures',
  templateUrl: './signatures.component.html',
  styleUrl: './signatures.component.css'
})
export class SignaturesComponent {


  token: any = localStorage.getItem('token');
  projectId: number = 0;
  userId: number = 8;
  is_acepted: boolean = false;
  date_acepted: any = '';

  signature = {

  }

  constructor(private _projectService: ProjectService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = +params['id'];
      console.log(this.projectId);
    });
  }

  createSignature() {
    this._projectService.confirmationSignature(
      this.token,
      this.projectId,
      this.userId,
      this.is_acepted,
      this.date_acepted
    ).subscribe((resp: any) => {
      console.log(resp);
    })
  }

}
