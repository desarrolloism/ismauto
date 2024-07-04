import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-signatures',
  templateUrl: './signatures.component.html',
  styleUrl: './signatures.component.css'
})
export class SignaturesComponent {


  projectDetail: any;
  token: any = localStorage.getItem('token');
  projectId: number = 0;
  userId: number = 8;
  is_acepted: boolean = false;
  date_acepted: any = '';
  allUsers: any[] = [];
  selectedUser: any;
  is_accepted: boolean = false;
  date_accepted: any = '';
  allSignatures: any;
  displayedColumns: string[] = ['date_accepted', 'user_name', 'is_accepted'];

  signature = {

  }

  constructor(private _projectService: ProjectService,
    private route: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('es-ES');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = +params['id'];
      console.log(this.projectId);
    });
    this.getDetail();
    this.getUsers();
    this.getallSignatures();
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

  getUsers() {
    this._projectService.getUsers(this.token).subscribe((resp: any) => {
      this.allUsers = resp.data;
      console.log('usuarios son ', this.allUsers);
    });
  }

  onUserSelected(user: any) {

    if (confirm('¿Está seguro de agregar a ' + user.first_name + '?')) {
      this.selectedUser = user;
      console.log('usuario:', user.first_name);
      console.log('id de usuariuo:', user.id);
      this.addSignature();
    }

  }


  getDetail() {
    this._projectService.getProjectDetail(this.token, this.projectId).subscribe(
      (resp: any) => {
        this.projectDetail = resp.data;
        console.log(this.projectDetail);

      }
    );
  }

  addSignature() {
    this._projectService.addSignature(
      this.token,
      this.projectId,
      this.selectedUser.id,
      this.is_accepted,
      this.date_accepted = this.dateAdapter.format(new Date(), 'yyyy-MM-dd')
    ).subscribe(resp => {
      console.log(resp);
      this.getDetail();
      this.getallSignatures();
    });
  }


  getallSignatures() {
    this._projectService.getSignatures(this.token, this.projectId).subscribe((resp: any) => {
      this.allSignatures = resp.data.sort((a: { is_accepted: any; }, b: { is_accepted: any; }) => {
        if (a.is_accepted && !b.is_accepted) return -1;
        if (!a.is_accepted && b.is_accepted) return 1;
        return 0;
      });
      console.log('FIRMAS Son', this.allSignatures);
    });
  }
}


