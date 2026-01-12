import {Injectable, inject, WritableSignal, signal, computed} from '@angular/core';
import {Job} from "./job.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {INIT_JOB} from "./job.model";
import { Observable } from 'rxjs';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JobService {


  http:HttpClient=inject(HttpClient);
  API_URL = "/api/hybrid-api";


  // private created$: WritableSignal<Job>=signal<Job>({...INIT_JOB});
  //État pour le job qui vient d'être créé
  private created$ = signal<Job | null>(null);

  // État pour la liste globale (le "Board")
  private allJobs$ = signal<Job[]>([]);

  // Sécuriser l'accès en lecture seule
  public readonly createdJob = computed(() => this.created$());
  public readonly getAllJobs = computed(() => this.allJobs$());

  create(job: Job): Observable<Job> {

    const formData: FormData = new FormData();

// Ajouter les images
    job.jobPictures.forEach((picture) => {
      formData.append('images', picture.file, picture.file.name);
    });

    // Assure-toi que job.date, job.heureDebut etc. sont bien des objets DateTime de Luxon
    const dtoPourBackend = {
      title: job.title,
      description: job.description,

      // Pour la date : renvoie "YYYY-MM-DD"
      date: job.date.toISODate(),

      // Pour les heures : renvoie "HH:mm"
      heureDebut: job.heureDebut.toFormat('HH:mm'),
      heureFin: job.heureFin.toFormat('HH:mm'),

      tarifPerHours: job.tarifPerHours,
      totalPrice: job.totalPrice,
      typeOfJob: job.typeOfJob,
      status: job.status,
      jobPublicId: "",
      address: job.address,
    };
    // On met ce JSON propre dans le Blob
    const jobBlob = new Blob([JSON.stringify(dtoPourBackend)], { type: 'application/json' });
    formData.append("jobDTO", jobBlob);

    return this.http.post<Job>(`${environment.API_URL}/job/create`, formData).pipe(
      tap(newJob => {
        // On met à jour l'état global via le Signal
        // Tous les composants qui affichent la liste seront mis à jour
        this.allJobs$.update(jobs => [newJob, ...jobs]);
      })
    );
  }


  constructor() { }



getOneJobByPublicId( jobbPublicId: string ): Observable<Job> {
 // const param= new HttpParams().set("jobPublicId", parent);
 //  this.http.get<Job>(`${environment.API_URL}/job/`, param);
    return this.http.get<Job>(`${environment.API_URL}/job/jobs/${jobbPublicId}`);
}

  // Méthode pour charger initialement les données du backend
  fetchAllJobs(): void {
    this.http.get<Job[]>(`${environment.API_URL}/job/jobs`).subscribe(jobs => {
      this.allJobs$.set(jobs);
    });
  }
}




// cette methode est ok c'est juste que je veux retourner un observable
///* create(job: Job): void {
//     const formData: FormData = new FormData();
//
// // Ajouter les images
//     job.jobPictures.forEach((picture) => {
//       formData.append('images', picture.file, picture.file.name);
//     });
//
//     // Assure-toi que job.date, job.heureDebut etc. sont bien des objets DateTime de Luxon
//     const dtoPourBackend = {
//       title: job.title,
//       description: job.description,
//
//       // Pour la date : renvoie "YYYY-MM-DD"
//       date: job.date.toISODate(),
//
//       // Pour les heures : renvoie "HH:mm"
//       heureDebut: job.heureDebut.toFormat('HH:mm'),
//       heureFin: job.heureFin.toFormat('HH:mm'),
//
//       tarifPerHours: job.tarifPerHours,
//       totalPrice: job.totalPrice,
//       typeOfJob: job.typeOfJob,
//       status: job.status,
//       jobPublicId: "",
//       address: job.address,
//     };
//     // On met ce JSON propre dans le Blob
//     const jobBlob = new Blob([JSON.stringify(dtoPourBackend)], { type: 'application/json' });
//     formData.append("jobDTO", jobBlob);
//
//     // 3. Envoi unique
//     this.http.post<Job>(`${environment.API_URL}/job/create`, formData)
//       .subscribe({
//         next: (newJob) => {
//           console.log( "this.createdJob()   : ", newJob);
//           this.created$.set(newJob);
//           this.allJobs$.set([newJob, ...this.allJobs$()]);
//
//         },
//         error: (error) => this.created$.set(error),
//       });
//   }*/
