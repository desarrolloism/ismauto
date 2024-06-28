import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-proj-list',
  templateUrl: './proj-list.component.html',
  styleUrl: './proj-list.component.css'
})
export class ProjListComponent implements OnInit {
  Projects: any;
  token: string | null = localStorage.getItem('token');

  updateProject = {
    id: 0,
    end_date: '',
    project_name: '',
    description: '',
    department: '',
    state: '',
  }

  //variables para correo
  name: string = '';
  email: string = '';
  last_name: string = '';
  fullname: string = '';

  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit() {
    this.getAllProjects(this.token as string);
    this.getAvatar();
  }

  //obtiene todos los casos
  getAllProjects(token: string) {
    this.projectService.getTickets(token).subscribe(
      (resp: any) => {
        this.Projects = resp.data;
        // console.log(this.Projects);
      });
  }

  //actualiza el estado del caso
  updateProjectState(projectId: number, newState: string) {
    // console.log(projectId);
    const projectToUpdate = this.Projects.find((project: any) => project.id === projectId);

    if (projectToUpdate) {
      this.updateProject = {
        id: projectId,
        end_date: projectToUpdate.end_date,
        project_name: projectToUpdate.project_name,
        description: projectToUpdate.description,
        department: projectToUpdate.department,
        state: newState,
      };

      this.projectService.updateProject(
        this.token,
        this.updateProject.id,
        this.updateProject.end_date,
        this.updateProject.project_name,
        this.updateProject.description,
        this.updateProject.department,
        this.updateProject.state,
      ).subscribe(resp => {
        // console.log(resp);
        projectToUpdate.state = newState;
      });
    }
  }

  //metodo para obtener datos del usuario
  getAvatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    this.fullname = this.name + ' ' + this.last_name
    // console.log(this.email);
  }

  //metodo para redireccionar al proyecto segun id
  goToProjectTasks(projectId: number) {
    this.router.navigate(['/project-tasks', projectId]);
  }
}