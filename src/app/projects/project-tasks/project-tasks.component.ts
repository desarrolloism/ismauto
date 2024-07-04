import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { state } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.css']
})
export class ProjectTasksComponent implements OnInit {

  projectId: number = 0;
  token: string | null = localStorage.getItem('token');
  projectDetail: any;
  isUpdating: boolean = false;
  allTasks: any;
  taskId = 0;

  updateForms: { [key: number]: FormGroup } = {};
  taskStates = ['INICIANDO', 'EN PROCESO', 'EN REVISION', 'TERMINADO'];

  newTask = {
    developer_id: 0,
    name_task: '',
    description_task: '',
    assignament_date: '',
    end_date: '',
    state: 'INICIANDO',
    observation: ''
  }

  taskForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private _projectService: ProjectService,
    private fb: FormBuilder
  ) {
    this.initForm();
    // this.getProjectTasks(this.token, this.projectId);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = +params['id'];
      // console.log(this.projectId);
    });
    this.getDetail();
    this.getProjectTasks(this.projectId);
  }

  //inicializa el formulario de creacion
  initForm() {
    this.taskForm = this.fb.group({
      developer_id: [null, Validators.required],
      name_task: ['', Validators.required],
      description_task: ['', Validators.required],
      assignament_date: ['', Validators.required],
      end_date: ['', Validators.required],
      observation: ['', Validators.required]
    });
  }

  //crea una nueva tarea
  createTask(projectId: number) {
    if (this.taskForm.valid) {
      const newTask = {
        ...this.taskForm.value,
        state: 'INICIANDO'
      };

      this._projectService.createTask(
        this.token,
        projectId,
        newTask.developer_id,
        newTask.name_task,
        newTask.description_task,
        newTask.assignament_date,
        newTask.end_date,
        newTask.state,
        newTask.observation
      ).subscribe((resp: any) => {
        if (resp.status == 'ok') {
          console.log(resp);
          alert('Tarea creada con exito');
          this.getProjectTasks(this.projectId);
          this.taskForm.reset(); 
        } else {
          alert('Error al crear la tarea');
        }

      });
    }
  }

  //inicializa el formulario de actualizacion
  initUpdateForm(task: any) {
    return this.fb.group({
      developer_id: [task.developer_id, Validators.required],
      name_task: [task.name_task, Validators.required],
      description_task: [task.description_task, Validators.required],
      assignament_date: [task.assignament_date, Validators.required],
      end_date: [task.end_date, Validators.required],
      state: [task.state, Validators.required],
      observation: [task.observation, Validators.required]
    });
  }

  //obtiene el detalle del proyecto
  getDetail() {
    this._projectService.getProjectDetail(this.token, this.projectId).subscribe(
      (resp: any) => {
        this.projectDetail = resp.data;
        // console.log(this.projectDetail);
      }
    );
  }

  //actualiza el estado del proyecto
  updateStatus(projectId: number, newStatus: string) {
    this.isUpdating = true; // Mostrar spinner
    this._projectService.updateProject(
      this.token,
      this.projectDetail.id,
      this.projectDetail.end_date,
      this.projectDetail.project_name,
      this.projectDetail.description,
      this.projectDetail.department,
      newStatus
    ).subscribe(
      (resp: any) => {
        // console.log(resp);
        this.projectDetail.state = newStatus;
        this.isUpdating = false;
      }
    );
  }

  //obtiene las tareas mediante el project ID
  getProjectTasks(projectId: number) {
    this._projectService.getTasks(this.token, projectId).subscribe((resp: any) => {
      this.allTasks = resp.data;
      // console.log('las tareasson', this.allTasks);
    });
  }

  //obtiene el id de la tarea
  panelOpened(taskId: number) {
    this.taskId = taskId;
    const task = this.allTasks.find((t: any) => t.id === taskId);
    if (task) {
      this.updateForms[taskId] = this.initUpdateForm(task);
    }
  }

  //Actualiza las tareas
  updateTask(taskId: number) {
    if (this.updateForms[taskId] && this.updateForms[taskId].valid) {
      const updatedTask = this.updateForms[taskId].value;
      this._projectService.updateTask(
        this.token,
        taskId,
        updatedTask.name_task,
        updatedTask.description_task,
        updatedTask.assignament_date,
        updatedTask.end_date,
        updatedTask.state,
        updatedTask.observation
      ).subscribe(resp => {
        // console.log(resp);
        this.getProjectTasks(this.projectId);
      });
    }
  }

}