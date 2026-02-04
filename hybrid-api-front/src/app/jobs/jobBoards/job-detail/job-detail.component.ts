import {Component, inject, OnInit} from '@angular/core';
import {JobService} from "../../job.service";
import {INIT_JOB, Job} from "../../job.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProgressSpinnerModule} from "primeng/progressspinner";

interface OnInitt {
}

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [
    ProgressSpinnerModule
  ],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css'
})
export class JobDetailComponent implements OnInit {



  private activatedrRoute: ActivatedRoute=inject(ActivatedRoute);
  private jobService: JobService=inject(JobService);

 jobByPublicId:Job={...INIT_JOB};
  private loading: boolean=true;
  isLoading: boolean=true;

  constructor() {
  }


  ngOnInit(): void {
    // 1. Extraire l'ID de l'URL (/jobs/962db614...)
    const publicId = this.activatedrRoute.snapshot.paramMap.get('jobPublicId');
    //ici jobPublicId est definie ds le app.route.ts //  path:"job-board/:jobPublicId", component: JobDetailComponent


    if (publicId) {
       const allJobs = this.jobService.getAllJobs();
      this.isLoading = false;
      // 2. Appeler le service
      this.jobService.getOneJobByPublicId(publicId).subscribe({
        next: (data) => {
          this.jobByPublicId = data;
          this.isLoading = false;

        },
        error: (err) => {
          console.error('Erreur lors de la récupération du job ici error ngOnInit()', err);
          this.isLoading = false;
        }
      });


    }
  }




}
