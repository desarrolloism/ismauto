import { Component, OnInit } from '@angular/core';
import { RepoService } from '../../services/repo.service';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
    //variables
    token = localStorage.getItem('token')
    navRepo: any[] = [];
    //variables

    constructor(private _repo: RepoService) { }

    ngOnInit() {
        this.navBar();
    }

    // obtiene botones para inicio  `
    navBar() {
        this._repo.getNav(this.token).subscribe((resp: any) => {
            this.navRepo = resp.data;
            console.log('resp de nav', this.navRepo);
        });
    }


    isInternalLink(id: number): boolean {
        return id !== 6 && id !== 7;
    }

    getRouterLink(id: number): string {
        switch (id) {
          case 2: return '/iso';
          case 3: return '/politicas-y-normativas';
          case 4: return '/documentos';
          default: return '/';
        }
      }

    getExternalLink(id: number): string {
        switch (id) {
            case 6: return 'https://help.ism.edu.ec/';
            default: return '#';
        }
    }
}
