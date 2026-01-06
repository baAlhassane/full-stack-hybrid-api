import {Component, model, output} from '@angular/core';
// Exemple dans app.component.ts
import {
  faLaptopCode, faHandsHelping, faUtensils, faLeaf,
  faBroom, faUserMd, faIndustry, faTruck, faBoxes,
  faBaby, faPaw, faHammer, faTools, faGraduationCap,
  faCalendarCheck, faEllipsisH
} from '@fortawesome/free-solid-svg-icons';

import {FaIconComponent, FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {Category, JOB_CATEGORIES, TypeOfJob} from "../../job.model";
import {NgClass} from "@angular/common";
@Component({
  selector: 'app-job-category',
  standalone: true,
  imports: [
    FaIconComponent,
    NgClass
  ],
  templateUrl: './job-category.component.html',
  styleUrl: './job-category.component.css'
})
export class JobCategoryComponent {


  constructor(library: FaIconLibrary) {
    library.addIcons(
      faLaptopCode, faHandsHelping, faUtensils, faLeaf,
      faBroom, faUserMd, faIndustry, faTruck, faBoxes,
      faBaby, faPaw, faHammer, faTools, faGraduationCap,
      faCalendarCheck, faEllipsisH
    );
  }

  categories: Category[] = JOB_CATEGORIES;

  selectedCategory = model.required<TypeOfJob>();
  stepValidityChange = output<boolean>();


  select(technicalName: TypeOfJob) {
    this.selectedCategory.set(technicalName);
    console.log(" this.selectedCategory()  in if ", this.selectedCategory());
    this.stepValidityChange.emit(true);


  }

}
