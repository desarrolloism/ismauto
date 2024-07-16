import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


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
  taskForm!: FormGroup;

  stateOrder = {
    'INICIANDO': 0,
    'EN PROCESO': 1,
    'EN REVISION': 2,
    'TERMINADO': 3
  };

  updateForms: { [key: number]: FormGroup } = {};
  taskStates = ['INICIANDO', 'EN PROCESO', 'EN REVISION', 'TERMINADO'];

  newTask = {
    developer_id: 0,
    name_task: '',
    description_task: '',
    assignament_date: '',
    end_date: '',
    state: 'INICIANDO',
    observation: '',
    responsible_counterpart: ''
  }

  resposible: any;


  // Variables para correo
  name: string = '';
  email: string = '';
  last_name: string = '';
  fullname: string = '';

  //variables para link

  link = {
    type_link: '',
    name_link: '',
    link: ''
  }

  linksList: any;

  constructor(
    private route: ActivatedRoute,
    private _projectService: ProjectService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initForm();
    // console.log(this.token);
    // this.getProjectTasks(this.token, this.projectId);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = +params['id'];
      // console.log(this.projectId);
    });
    this.getDetail();
    this.getProjectTasks(this.projectId);
    this.getAvatar();
    this.getLinks();
  }

  //cambia de color segun el estado
  getStateClass(state: string): string {
    switch (state) {
      case 'INICIANDO':
        return 'state-iniciando';
      case 'EN PROCESO':
        return 'state-en-proceso';
      case 'EN REVISION':
        return 'state-en-revision';
      case 'TERMINADO':
        return 'state-terminado';
      default:
        return '';
    }
  }


  //inicializa el formulario de creacion
  initForm() {
    this.taskForm = this.fb.group({
      developer_id: [null, Validators.required],
      name_task: ['', Validators.required],
      description_task: ['', Validators.required],
      assignament_date: ['', Validators.required],
      end_date: ['', Validators.required],
      observation: ['', Validators.required],
      responsible_counterpart: ['', Validators.required]
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
        newTask.observation,
        newTask.responsible_counterpart
      ).subscribe((resp: any) => {
        if (resp.status == 'ok') {
          // console.log(resp);
          alert('Tarea creada con exito');
          this.getProjectTasks(this.projectId);
          this.sortTasks();
          this.taskForm.reset();
        } else {
          alert('Error al crear la tarea');
        }

      });
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
        updatedTask.observation,
        updatedTask.responsible_counterpart
      ).subscribe(resp => {
        this.getProjectTasks(this.projectId);
        this.sortTasks();
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
      observation: [task.observation, Validators.required],
      responsible_counterpart: [task.responsible_counterpart, Validators.required]
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
      console.log(this.allTasks);
      this.sortTasks();
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

  //metodos para ordenar tareas por estado 

  sortTasks() {
    this.allTasks.sort((a: { state: string; }, b: { state: string; }) => {
      const stateA = a.state as keyof typeof this.stateOrder;
      const stateB = b.state as keyof typeof this.stateOrder;
      return this.stateOrder[stateA] - this.stateOrder[stateB];
    });
  }

  //llama al metodo para eliminar proyecto

  deleteProject() {
    if (confirm('¿Está seguro de eliminar ' + this.projectDetail.project_name + ' , esto eliminará todas sus tareas e información?')) {
      if (confirm('Se eliminaran todos los datos.')) {
        this.deleteActualProject();
      } else {
        alert('Eliminacion de ' + this.projectDetail.project_name + ' cancelada');
      }
    }
  }


  //elimina el proyecto
  deleteActualProject() {
    this._projectService.deleteProject(this.token, this.projectId).subscribe(resp => {
      // console.log(resp);
      this.router.navigate(['/proj-list']);
    });
  }

  //redirije a firmas
  projectSignatures(projectId: number) {
    this.router.navigate(['/signatures', projectId]);
  }

  //obtiene los datos del usuario
  getAvatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    this.fullname = this.name + ' ' + this.last_name;
    // console.log(this.fullname);
    // console.log(this.email);
    // console.log(this.email);
  }

  //metodo para links
  agregarLink() {
    console.log('num de task es',this.taskId);
    this._projectService.addLink(
      this.token,
      this.taskId,
      this.link.type_link,
      this.link.name_link,
      this.link.link
    ).subscribe(resp => {
      console.log(resp);
      this.getLinks();
    });
  }

  //muestra links mediante el id
  getLinks() {
    this._projectService.getLinks(this.token, this.taskId).subscribe((resp: any) => {
      this.linksList = resp.data;
      console.log('links son',this.linksList);
    });
  }

}