import {Component, computed, model, output} from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {DateTime} from "luxon";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-job-date',
  standalone: true,
  imports: [
    CalendarModule,
    FormsModule
  ],
  templateUrl: './job-date.component.html',
  styleUrl: './job-date.component.css'
})
export class JobDateComponent {


  date = model.required<DateTime>();
  stepValidityChange=output<boolean>();


  constructor() {
    console.log("  convertToLuxon in constructor  " );

  }


  convertToLuxon(event: Date | null): DateTime {
    if (!event) {
      console.log("  convertToLuxon in if ", event  );
      return DateTime.now();
    }
    console.log("  convertToLuxon ", event  );
    this.stepValidityChange.emit(true);
    // La méthode magique de Luxon
    return DateTime.fromJSDate(event);
  }


  // job-date.component.ts
  onDateChange(event: Date | string | null) {
    console.log("Date reçue :", event);

    if (!event) return;

    let luxonDate: DateTime;

    if (event instanceof Date) {
      // Cas PrimeNG
      luxonDate = DateTime.fromJSDate(event);
    } else {
      // Cas Input HTML (string ISO)
      luxonDate = DateTime.fromISO(event);
    }

    if (luxonDate.isValid) {
      this.date.set(luxonDate);
      this.stepValidityChange.emit(true);
    }
  }

  // On sépare la logique pour plus de clarté
  // onDateChange(event: Date | null) {
  //   console.log("Date reçue du calendrier :", event);
  //   if (event) {
  //     const luxonDate = DateTime.fromJSDate(event);
  //     this.date.set(luxonDate);
  //     this.stepValidityChange.emit(true);
  //   }
  // }
  // emitValidity() {
  //   this.stepValidityChange.emit(true);
  // }

  // On crée une version Date JS "stable" pour PrimeNG
  dateForPicker = computed(() => {
    const current = this.date();
    return current ? current.toJSDate() : null;
  });

}



