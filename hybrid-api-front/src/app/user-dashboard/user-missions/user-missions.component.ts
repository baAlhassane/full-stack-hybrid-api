import { Component } from '@angular/core';
import {Job, JobStatus, TypeOfJob} from "../../jobs/job.model";
import { DateTime } from 'luxon';

@Component({
  selector: 'app-user-missions',
  standalone: true,
  imports: [],
  templateUrl: './user-missions.component.html',
  styleUrl: './user-missions.component.css'
})
export class UserMissionsComponent {



missions: Job[] = [
  {
    title:"job title",
    description: 'Installation et configuration d’un poste informatique',
    date: DateTime.fromISO('2025-09-10'),
    heureDebut: DateTime.fromISO('2025-09-10T08:00'),
    heureFin: DateTime.fromISO('2025-09-10T12:00'),
    tarifPerHours: 25,
    totalPrice: 100,
    typeOfJob: TypeOfJob.IT,
    status: JobStatus.PAST,
    jobPublicId:"",
    jobPictures:[]
  },
  {
    title:"job title",
    description: 'Nettoyage complet d’un appartement',
    date: DateTime.fromISO('2025-12-24'),
    heureDebut: DateTime.fromISO('2025-12-24T14:00'),
    heureFin: DateTime.fromISO('2025-12-24T18:00'),
    tarifPerHours: 20,
    totalPrice: 80,
    typeOfJob: TypeOfJob.CLEANING,
    status: JobStatus.CURRENT,
    jobPublicId:"",
    jobPictures:[]
  },
  {
    title:"job title",
    description: 'Travaux de jardinage et entretien extérieur',
    date: DateTime.fromISO('2026-01-05'),
    heureDebut: DateTime.fromISO('2026-01-05T09:00'),
    heureFin: DateTime.fromISO('2026-01-05T17:00'),
    tarifPerHours: 30,
    totalPrice: 240,
    typeOfJob: TypeOfJob.GARDENING,
    status: JobStatus.FUTURE,
    jobPublicId:"",
    jobPictures:[]
  }
];

  // const pastJobs = jobber.jobs.filter(j => j.status === JobStatus.PAST)
  // const currentJobs = jobber.jobs.filter(j => j.status === JobStatus.CURRENT)
  // const futureJobs = jobber.jobs.filter(j => j.status === JobStatus.FUTURE)


  protected readonly JobStatus = JobStatus;
}
