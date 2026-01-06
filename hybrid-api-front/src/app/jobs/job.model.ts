import { DateTime } from 'luxon';
import {IconName} from "@fortawesome/fontawesome-svg-core";
import {Step} from "./Step.model.";


export enum JobStatus {
  PAST = 'PAST',
  CURRENT = 'CURRENT',
  FUTURE = 'FUTURE'
}


export interface JobPictureDTO {
  file: File,
  urlDisplay:string
}

export interface Job {
  title:string;
  description:string;
  date: DateTime;          // LocalDate
  heureDebut: DateTime;    // LocalTime (date fictive)
  heureFin: DateTime;      // LocalTime (date fictive)
  tarifPerHours: number;
  totalPrice: number;
  typeOfJob: TypeOfJob;
  status: JobStatus
  jobPictures: JobPictureDTO[];
  jobPublicId:""

}





export enum TypeOfJob {
  IT = 'IT',
  PERSONAL_ASSISTANCE = 'PERSONAL_ASSISTANCE',
  RESTAURANT = 'RESTAURANT',
  GARDENING = 'GARDENING',
  CLEANING = 'CLEANING',
  HEALTH = 'HEALTH',
  INDUSTRY = 'INDUSTRY',
  DELIVERY = 'DELIVERY',
  MOVING = 'MOVING',
  BABYSITTING = 'BABYSITTING',
  PET_CARE = 'PET_CARE',
  CONSTRUCTION = 'CONSTRUCTION',
  MAINTENANCE = 'MAINTENANCE',
  EDUCATION = 'EDUCATION',
  EVENT = 'EVENT',
  OTHER = 'OTHER',
  DEFAULT='DAFAULT'
}

export const TypeOfJobLabels: Record<TypeOfJob, string> = {
  [TypeOfJob.IT]: 'Informatique',
  [TypeOfJob.PERSONAL_ASSISTANCE]: 'Assistance personnelle',
  [TypeOfJob.RESTAURANT]: 'Restauration',
  [TypeOfJob.GARDENING]: 'Jardinage',
  [TypeOfJob.CLEANING]: 'Nettoyage',
  [TypeOfJob.HEALTH]: 'Santé',
  [TypeOfJob.INDUSTRY]: 'Industrie',
  [TypeOfJob.DELIVERY]: 'Livraison',
  [TypeOfJob.MOVING]: 'Déménagement',
  [TypeOfJob.BABYSITTING]: 'Baby-sitting',
  [TypeOfJob.PET_CARE]: 'Garde d’animaux',
  [TypeOfJob.CONSTRUCTION]: 'Construction',
  [TypeOfJob.MAINTENANCE]: 'Maintenance',
  [TypeOfJob.EDUCATION]: 'Éducation',
  [TypeOfJob.EVENT]: 'Événementiel',
  [TypeOfJob.OTHER]: 'Autre',
  [TypeOfJob.DEFAULT]: 'Default',
};

export interface Category {
  icon: IconName;
  displayName: string;
  technicalName: TypeOfJob;
  activated: boolean;
}

export const JOB_CATEGORIES: Category[] = [
  { technicalName: TypeOfJob.IT, displayName: TypeOfJobLabels[TypeOfJob.IT], icon: 'laptop-code', activated: true },
  { technicalName: TypeOfJob.PERSONAL_ASSISTANCE, displayName: TypeOfJobLabels[TypeOfJob.PERSONAL_ASSISTANCE], icon: 'hands-helping', activated: false },
  { technicalName: TypeOfJob.RESTAURANT, displayName: TypeOfJobLabels[TypeOfJob.RESTAURANT], icon: 'utensils', activated: false },
  { technicalName: TypeOfJob.GARDENING, displayName: TypeOfJobLabels[TypeOfJob.GARDENING], icon: 'leaf', activated: false },
  { technicalName: TypeOfJob.CLEANING, displayName: TypeOfJobLabels[TypeOfJob.CLEANING], icon: 'broom', activated: false },
  { technicalName: TypeOfJob.HEALTH, displayName: TypeOfJobLabels[TypeOfJob.HEALTH], icon: 'user-md', activated: false },
  { technicalName: TypeOfJob.INDUSTRY, displayName: TypeOfJobLabels[TypeOfJob.INDUSTRY], icon: 'industry', activated: false },
  { technicalName: TypeOfJob.DELIVERY, displayName: TypeOfJobLabels[TypeOfJob.DELIVERY], icon: 'truck', activated: false },
  { technicalName: TypeOfJob.MOVING, displayName: TypeOfJobLabels[TypeOfJob.MOVING], icon: 'boxes', activated: false },
  { technicalName: TypeOfJob.BABYSITTING, displayName: TypeOfJobLabels[TypeOfJob.BABYSITTING], icon: 'baby', activated: false },
  { technicalName: TypeOfJob.PET_CARE, displayName: TypeOfJobLabels[TypeOfJob.PET_CARE], icon: 'paw', activated: true },
  { technicalName: TypeOfJob.CONSTRUCTION, displayName: TypeOfJobLabels[TypeOfJob.CONSTRUCTION], icon: 'hammer', activated: false },
  { technicalName: TypeOfJob.MAINTENANCE, displayName: TypeOfJobLabels[TypeOfJob.MAINTENANCE], icon: 'tools', activated: false },
  { technicalName: TypeOfJob.EDUCATION, displayName: TypeOfJobLabels[TypeOfJob.EDUCATION], icon: 'graduation-cap', activated: false },
  { technicalName: TypeOfJob.EVENT, displayName: TypeOfJobLabels[TypeOfJob.EVENT], icon: 'calendar-check', activated: false },
  { technicalName: TypeOfJob.OTHER, displayName: TypeOfJobLabels[TypeOfJob.OTHER], icon: 'ellipsis-h', activated: false }
];


export const INIT_JOB: Job = {
  "title": "",
  "description": "",
  // 1. "LocalDate" : Aujourd'hui à minuit (00:00:00)
  "date": DateTime.now().startOf('day'),
  // 2. "LocalTime" : Aujourd'hui à 09:00
  "heureDebut": DateTime.now().set({"hour": 9, "minute": 0, "second": 0, "millisecond": 0}),
  // 3. "LocalTime" : Aujourd'hui à 18:00
  "heureFin": DateTime.now().set({"hour": 18, "minute": 0, "second": 0, "millisecond": 0}),
  "tarifPerHours": 0,
  "totalPrice": 0,
  "typeOfJob": TypeOfJob.DEFAULT,
  "status": JobStatus.FUTURE,
  "jobPublicId":"",
  "jobPictures" : [],
};


export  const JOB_ID_SEQUENCE={
  CATEGORY: "category",
  LOCATION: "location",
  PICTURES: "pictures",
  DESCRIPTION:"description",
  PROVIDER_INFO:"providerInfo",
  DATE: "date",
  TIMES: "times"

}


export const STEPS: Step[] = [
  {
    id: JOB_ID_SEQUENCE.CATEGORY,
    idNext: JOB_ID_SEQUENCE.DESCRIPTION,
    idPrevious: null,
    isValid: false
  },
  {
    id: JOB_ID_SEQUENCE.DESCRIPTION,
    idNext: JOB_ID_SEQUENCE.PROVIDER_INFO,
    idPrevious: JOB_ID_SEQUENCE.CATEGORY,
    isValid: false
  }, {
    id: JOB_ID_SEQUENCE.PROVIDER_INFO,
    idNext: JOB_ID_SEQUENCE.DATE,
    idPrevious: JOB_ID_SEQUENCE.DESCRIPTION,
    isValid: false
  },
  {
    id: JOB_ID_SEQUENCE.DATE,
    idNext: JOB_ID_SEQUENCE.TIMES,
    idPrevious: JOB_ID_SEQUENCE.PROVIDER_INFO,
    isValid: false
  },
  {
    id: JOB_ID_SEQUENCE.TIMES,
    idNext: JOB_ID_SEQUENCE.PICTURES,
    idPrevious: JOB_ID_SEQUENCE.DATE,
    isValid: false
  },
  {
    id: JOB_ID_SEQUENCE.PICTURES ,
    idNext: null,
    idPrevious: JOB_ID_SEQUENCE.TIMES,
    isValid: false
  },
];
