import {Component, computed, effect, model, output} from '@angular/core';
import {DateTime} from "luxon";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-job-date-time',
  standalone: true,
  imports: [
    CalendarModule,
    FormsModule,
    CurrencyPipe,
  ],
  templateUrl: './job-date-time.component.html',
  styleUrl: './job-date-time.component.css'
})
export class JobDateTimeComponent {



  date=model.required<DateTime>();
  heureDeDebut=model.required<DateTime>();
  heureDeFin=model.required<DateTime>();

  tarifPerHours=model.required<number>();
  totalPrice=model.required<number>();

  stepValidityChange = output<boolean>();


  emitValidity() {
    const isValid =
      this.heureDeFin() > this.heureDeDebut() &&
      this.tarifPerHours() > 0;

    this.stepValidityChange.emit(isValid);
  }

  /**
 * Convertit une Date native (JS) venant du p-calendar en DateTime Luxon.
 * On utilise une fonction fléchée ou une méthode classique.
 */
convertToLuxon(event: Date | null): DateTime {
  if (!event) {
    // Si la date est effacée, on peut renvoyer la date actuelle
    // ou gérer le null selon tes besoins.
    this.emitValidity();
    return DateTime.now();
  }

  // La méthode magique de Luxon
  return DateTime.fromJSDate(event);
}

// 1. Calcul automatique réactif
//   totalRate = computed(() => {
//     const start = this.heureDeDebut();
//     const end = this.heureDeFin();
//     const rate = this.tarifPerHours();
//
//     if (end > start) {
//       const diffInHours = end.diff(start, 'hours').hours;
//       return Math.round(diffInHours * rate); // Arrondi pour le backend (int)
//     }
//     return 0;
//   });


  constructor() {
// ON SUPPRIME l'effect qui fait .set()
    // OU on utilise cette version sécurisée qui ne boucle pas :
    // effect(() => {
    //   const currentCalculated = this.totalRate();
    //   // On n'écrit que si la valeur est différente de celle actuelle du parent
    //   // Cela casse la boucle infinie
    //   if (this.totalPrice() !== currentCalculated) {
    //     this.totalPrice.set(currentCalculated);
    //   }
    //   console.log('case DATE:', this.date());
    //   // Notification de validité
    //  // this.stepValidityChange.emit(this.heureDeFin() > this.heureDeDebut());
    // }, { allowSignalWrites: true });
  }


}
