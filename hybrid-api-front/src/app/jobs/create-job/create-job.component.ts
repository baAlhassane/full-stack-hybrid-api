import {Component, inject} from '@angular/core';
import {JobDescriptionComponent} from "../createJobSteps/job-description/job-description.component";
import {INIT_JOB, Job, JOB_ID_SEQUENCE, JobPictureDTO, JobStatus, STEPS, TypeOfJob} from "../job.model";
import {DateTime} from "luxon";
import {FootSeqStepComponent} from "../foot-seq-step/foot-seq-step.component";
import {Step} from "../Step.model.";
import {ProviderInfosComponent} from "../createJobSteps/provider-infos/provider-infos.component";
import {Provider} from "../../users/models/users";
import {JobDateTimeComponent} from "../createJobSteps/job-date-time/job-date-time.component";
import {CommonModule} from "@angular/common";
import {JobDateComponent} from "../createJobSteps/job-date/job-date.component";
import {JobTimeComponent} from "../createJobSteps/job-time/job-time.component";
import {JobCategoryComponent} from "../createJobSteps/job-category/job-category.component";
import {UserProfileComponent} from "../../user-dashboard/user-profile/user-profile.component";
import {JobPicureComponent} from "../createJobSteps/job-picure/job-picure.component";
import {JobService} from "../job.service";
import {Router} from "@angular/router";
import {AddressSearchComponent} from "../jobMap/address-search/address-search.component";

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [
    CommonModule,
    JobDescriptionComponent,
    FootSeqStepComponent,
    ProviderInfosComponent,
    JobDateComponent,
    JobTimeComponent,
    JobCategoryComponent,
    JobPicureComponent,
    AddressSearchComponent
  ],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css'
})
export class CreateJobComponent {


  jobService=inject(JobService);
// Valeurs par défaut
  job: Job = {...INIT_JOB};

 stepId={...JOB_ID_SEQUENCE};

  steps: Step[] = [ ...STEPS];
  currentStep:Step=this.steps[0];
  loardingCreation: boolean=false;
  firstname:string="";
  lastname:string="";
  private router: Router=inject(Router);

  onValidityChange(valid:boolean): void {
    this.currentStep.isValid = valid;
    console.log("-------------------------");
  }


  nextStep() {
    if(this.currentStep.idNext !== null) {
      this.currentStep=this.steps.filter((step:Step ) => step.id === this.currentStep.idNext)[0];
      console.log("this.currentStep.id : ",this.currentStep.id);
    }
  }

  previousStep() {
    if(this.currentStep.idPrevious !== null) {
      this.currentStep=this.steps.filter((step:Step ) => step.id === this.currentStep.idPrevious)[0];
    }
  }
  finishStep() {
    //this.loardingCreation = true;
    console.log( "this.job : ", this.job);
    //this.jobService.create(this.job);
    // On appelle le service ET on s'abonne
    this.jobService.create(this.job).subscribe({
      next: (createdJob) => {
        // ✅ SUCCÈS : Le job est créé en base de données
        this.loardingCreation= false;

        // On ne redirige QUE maintenant
        this.router.navigate(['/jobs']);

        // Optionnel : Afficher un petit message de succès
        // this.toast.show('Job créé avec succès !');
      },
      error: (err) => {
        // ❌ ERREUR : Le serveur a refusé (ex: 400 Bad Request)
        this.loardingCreation
        console.error("Erreur lors de la création", err);
        // On reste sur la page pour que l'utilisateur puisse corriger
      }
    });

  }


  isAllStepValid() {
    return this.steps.filter(step=> step.isValid).length === this.steps.length;

  }


  protected readonly console = console;


}
