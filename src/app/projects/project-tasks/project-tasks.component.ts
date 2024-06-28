import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.css']
})
export class ProjectTasksComponent implements OnInit {
  projectId: number = 0;
  token: string | null = localStorage.getItem('token');
  projectDetail: any;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {

    // this.getProjectTasks(this.token, this.projectId);

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = +params['id'];
      console.log(this.projectId);
    });
    this.getDetail();
  }


  getDetail() {
    this.projectService.getProjectDetail(this.token, this.projectId).subscribe(
      (resp:any) => {
        this.projectDetail = resp.data;
        console.log(this.projectDetail);
      }
    );
  }

}