import { Component, OnInit } from '@angular/core';
import { RepoService } from '../../services/repo.service';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
    token = localStorage.getItem('token');
    category = 2;
    repo: any[] = []; 

    constructor(private _repo: RepoService) { }

    ngOnInit() {
        this.getRepository();
    }

    getRepository() {
        this._repo.getRepository(this.token, this.category).subscribe((resp: any) => {
            this.repo = resp.categoria.tipos; 
            console.log(this.repo);
        });
    }
}
