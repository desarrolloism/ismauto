import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

@Component({
  selector: 'app-proj-list',
  templateUrl: './proj-list.component.html',
  styleUrls: ['./proj-list.component.css']
})
export class ProjListComponent implements OnInit {
  Projects: any;
  token: string | null = localStorage.getItem('token');
  dev_front = 4;
  dev_back = 8;
  boss = 1;
  frontTasks: any = [];
  backTasks: any = [];
  bossTasks: any = [];

  // Variables para correo
  name: string = '';
  email: string = '';
  last_name: string = '';
  fullname: string = '';

  private driverObj: any;


  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit() {
    this.getAllProjects(this.token as string);
    this.getAvatar();
    this.initializeDriver();
  }

  //prueba driver js

  initializeDriver() {
    this.driverObj = driver({
      showProgress: true,
      steps: [
        { element: '#create-project-btn', popover: { title: 'Crear Proyecto', description: 'Haga clic aquí para crear un nuevo proyecto.' } },
        // Add more steps as needed
      ]
    });
  }

  startTutorial() {
    this.driverObj.drive();
  }

  // Obtiene todos los proyectos
  getAllProjects(token: string) {
    this.projectService.getTickets(token).subscribe(
      (resp: any) => {
        this.Projects = resp.data;
        // console.log(this.Projects);
        this.Projects.forEach((project: { id: number; }) => {
          this.frontTask(project.id, this.dev_front);
          this.backTask(project.id, this.dev_back);
          this.bossTask(project.id, this.boss);
        });
      });
  }

  // Método para obtener datos del usuario
  getAvatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    this.fullname = this.name + ' ' + this.last_name;
    // console.log(this.email);
  }

  // Método para redireccionar al proyecto según id
  goToProjectTasks(projectId: number) {
    this.router.navigate(['/project-tasks', projectId]);
  }

  projectSignatures(projectId: number) {
    this.router.navigate(['/signatures', projectId]);
  }


  // Método para obtener las tareas del frontend
  frontTask(projectId: number, developerId: number) {
    this.projectService.developerTasks(this.token, projectId, developerId).subscribe((resp: any) => {
      const projectIndex = this.Projects.findIndex((p: { id: number; }) => p.id === projectId);
      if (projectIndex !== -1) {
        this.Projects[projectIndex].frontTasks = resp.data;
      }
      // console.log('las tareas front', resp);
    });
  }

  // Método para obtener las tareas del backend
  backTask(projectId: number, developerId: number) {
    this.projectService.developerTasks(this.token, projectId, developerId).subscribe((resp: any) => {
      const projectIndex = this.Projects.findIndex((p: { id: number; }) => p.id === projectId);
      if (projectIndex !== -1) {
        this.Projects[projectIndex].backTasks = resp.data;
      }
      // console.log('las tareas son back', resp);
    });
  }


  // Método para obtener las tareas del JEFE
  bossTask(projectId: number, developerId: number) {
    this.projectService.developerTasks(this.token, projectId, developerId).subscribe((resp: any) => {
      const projectIndex = this.Projects.findIndex((p: { id: number; }) => p.id === projectId);
      if (projectIndex !== 1) {
        this.Projects[projectIndex].bossTasks = resp.data;
      }
      // console.log('las tareas del jefe', resp);
    });
  }


}
