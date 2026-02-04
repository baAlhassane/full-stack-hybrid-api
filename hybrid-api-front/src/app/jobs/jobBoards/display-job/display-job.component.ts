import {Component, computed, inject, input, output, Signal} from '@angular/core';
import {Job} from "../../job.model";
import {JobService} from "../../job.service";
import {NgClass} from "@angular/common";
import {CardModule} from "primeng/card";
import {RelativeTimePipe} from "../../../pipes/relative-time.pipe";
import {Router, RouterLink} from "@angular/router";

import {FontAwesomeJobIconsService} from "../../font-awesome-job-icons.service";


import {FaIconComponent, FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {fontAwesomeIcons} from "../../../../font-awesome";
@Component({
  selector: 'app-display-job',
  standalone: true,
  imports: [
    NgClass,
    CardModule,
    RelativeTimePipe,
    RouterLink,
    FaIconComponent
  ],
  templateUrl: './display-job.component.html',
  styleUrl: './display-job.component.css'
})
export class DisplayJobComponent {
 jobService: JobService=inject(JobService);
  // job=this.jobService.getCretedJobSig();
  job=input.required<Job>();
  // selectedCard= output<string>();
  private router: Router=inject(Router);

  fontAwesomeJobIconsService=inject(FontAwesomeJobIconsService);

// L'icône (objet)
  iconJob = computed(() => this.fontAwesomeJobIconsService.getIcon(this.job().typeOfJob));

// Le texte traduit
  labelJob = computed(() => this.fontAwesomeJobIconsService.getLabel(this.job().typeOfJob));
  fullAddressLabel = computed(() => {
    const addr = this.job().address;
    return `${addr.street}, ${addr.city}`;
  });

  goToJobDetails() {
    // this.selectedCard.emit(this.job().jobPublicId);
    // this.router.navigate(['/jobs', this.job().jobPublicId]);
    //this.router.navigate(['/job-detail'])
  }
}
