import {Component, inject, OnInit} from '@angular/core';
import {JobService} from "../../job.service";
import {Router} from "@angular/router";
import {DisplayJobComponent} from "../display-job/display-job.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-job-board',
  standalone: true,
  imports: [
    DisplayJobComponent,
    CommonModule,

  ],
  templateUrl: './job-board.component.html',
  styleUrl: './job-board.component.css'
})
export class JobBoardComponent implements OnInit {


  private jobService =inject(JobService);
  jobs=this.jobService.getAllJobs;
  private router =inject(Router);


  ngOnInit() {
    this.jobService.fetchAllJobs(); // Charge les jobs existants au démarrage
  }
  goToDetails(publicId: string) {
    console.log("go to details",publicId);
    this.router.navigate(['/job-detail', publicId]);
  }
}
