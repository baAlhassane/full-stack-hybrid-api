import { Injectable } from '@angular/core';
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";
import { TypeOfJob } from "./job.model";
import {
  faBabyCarriage,
  faBoxOpen,
  faBriefcase,
  faBroom, faGraduationCap,
  faHandsHoldingChild, faHelmetSafety,
  faIndustry,
  faLaptopCode,
  faLeaf, faPaw,
  faScrewdriverWrench, faStar,
  faStethoscope,
  faTruckFast,
  faUtensils
} from "@fortawesome/free-solid-svg-icons";

@Injectable({
  providedIn: 'root'
})
export class FontAwesomeJobIconsService {

  // 1. La Map pour les Icônes (Objets FontAwesome)
  private iconMap: Record<string, any> = {
    [TypeOfJob.IT]: faLaptopCode,
    [TypeOfJob.PERSONAL_ASSISTANCE]: faHandsHoldingChild,
    [TypeOfJob.RESTAURANT]: faUtensils,
    [TypeOfJob.GARDENING]: faLeaf,
    [TypeOfJob.CLEANING]: faBroom,
    [TypeOfJob.HEALTH]: faStethoscope,
    [TypeOfJob.INDUSTRY]: faIndustry,
    [TypeOfJob.DELIVERY]: faTruckFast,
    [TypeOfJob.MOVING]: faBoxOpen,
    [TypeOfJob.BABYSITTING]: faBabyCarriage,
    [TypeOfJob.PET_CARE]: faPaw,
    [TypeOfJob.CONSTRUCTION]: faHelmetSafety,
    [TypeOfJob.MAINTENANCE]: faScrewdriverWrench,
    [TypeOfJob.EDUCATION]: faGraduationCap,
    [TypeOfJob.EVENT]: faStar,
    [TypeOfJob.OTHER]: faBriefcase,
    [TypeOfJob.DEFAULT]: faBriefcase
  };

  // 2. La Map pour les Labels (Traduction)
  private labelMap: Record<string, string> = {
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
    [TypeOfJob.DEFAULT]: 'Défaut',
  };

  // Méthode pour l'icône
  getIcon(type: TypeOfJob): any {
    return this.iconMap[type] || faBriefcase;
  }

  // Méthode pour le texte
  getLabel(type: TypeOfJob): string {
    return this.labelMap[type] || type.toString();
  }
}
