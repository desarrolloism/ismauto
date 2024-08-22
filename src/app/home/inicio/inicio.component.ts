import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  procesos = [
    {
        titulo: 'Planificación de proyectos',
        categoria: 'CAM. TI',
        badge_icon: 'fa-solid fa-code',
        badge_text: 'Desarrollo de software',
        url: 'https://nnovupro.ism.edu.ec/#/login',
    },
    {
        titulo: 'Proceso de compras',
        categoria: 'CAM. TI',
        badge_icon: 'fa-solid fa-cart-shopping',
        badge_text: 'Adquisiciones',
        url: 'https://sgequito.ism.edu.ec/dev/automatizacion/innovucompras/web/com-cabecera',
    },
    {
        titulo: 'Plan operativo Anual',
        categoria: 'CAM. TI',
        badge_icon: 'fa-solid fa-chart-line',
        badge_text: 'Financiero',
        url: 'https://nnovupro.ism.edu.ec/#/login',
    },
    {
        titulo: 'Soporte técnico',
        categoria: 'CAM. TI',
        badge_icon: 'fa-solid fa-bug',
        badge_text: 'Sistemas',
        url: 'https://help.ism.edu.ec/',
    },
];


toggleCollapse(index: number) {
    const element = document.getElementById('collapse' + index);
    if (element) {
        const isCollapsed = element.classList.contains('show');
        element.classList.toggle('show', !isCollapsed);
    }
}

}
