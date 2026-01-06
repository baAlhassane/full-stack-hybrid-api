import {Component, inject, input, output, Signal} from '@angular/core';
import {Job} from "../../job.model";
import {JobService} from "../../job.service";

@Component({
  selector: 'app-display-job',
  standalone: true,
  imports: [],
  templateUrl: './display-job.component.html',
  styleUrl: './display-job.component.css'
})
export class DisplayJobComponent {
 jobService: JobService=inject(JobService);
  // job=this.jobService.getCretedJobSig();
  job=input.required<Job>();
  selectedCard= output<string>();

  onCardClick() {
  this.selectedCard.emit(this.job().jobPublicId);
  }
}
