import {Injectable, inject, WritableSignal, signal, computed} from '@angular/core';
import {Job} from "./job.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {INIT_JOB} from "./job.model";

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
  constructor() { }
  create(job: Job): void {
    const formData: FormData = new FormData();

// Ajouter les images
    job.jobPictures.forEach((picture) => {
      formData.append('pictures', picture.file, picture.file.name);
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
      jobPublicId: this.generatePublicId()
    };
    // On met ce JSON propre dans le Blob
    const jobBlob = new Blob([JSON.stringify(dtoPourBackend)], { type: 'application/json' });
    formData.append("jobDTO", jobBlob);

    // 3. Envoi unique
    this.http.post<Job>(`${environment.API_URL}/job/create`, formData)
      .subscribe({
        next: (newJob) => {
          if (newJob && newJob.jobPublicId) {
            this.created$.set(newJob);
            // On n'ajoute à la liste que si l'objet est valide
            this.allJobs$.update(jobs => [newJob, ...jobs]);
          } else {
            console.error('Le serveur a répondu avec un objet vide ou incomplet');
          }

        },
        error: (error) => this.created$.set(error),
      });
  }

  // Dans ton service ou un fichier utilitaire
  generatePublicId(): string {
    return crypto.randomUUID(); // Génère un format : "123e4567-e89b-12d3-a456-426614174000"
  }

  // Méthode pour charger initialement les données du backend
  fetchAllJobs(): void {
    this.http.get<Job[]>(`${environment.API_URL}/job/all`).subscribe(jobs => {
      this.allJobs$.set(jobs);
    });
  }
}
