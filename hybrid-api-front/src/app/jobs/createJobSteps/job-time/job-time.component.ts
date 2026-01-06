import { Component, computed, effect, model, output, untracked } from '@angular/core';
import { DateTime } from "luxon";
import { CalendarModule } from "primeng/calendar";
import { FormsModule } from "@angular/forms";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: 'app-job-time',
  standalone: true,
  imports: [CalendarModule, FormsModule, CurrencyPipe],
  templateUrl: './job-time.component.html'
})
export class JobTimeComponent {
  // Inputs/Outputs via Signals
  heureDeDebut = model.required<DateTime>();
  heureDeFin = model.required<DateTime>();
  tarifPerHours = model.required<number>();
  totalPrice = model.required<number>();
  stepValidityChange = output<boolean>();

  // 1. Convertisseurs stables pour PrimeNG (évite les boucles infinies)
  startForPicker = computed(() => this.heureDeDebut()?.toJSDate());
  endForPicker = computed(() => this.heureDeFin()?.toJSDate());

  // 2. Calcul du prix automatique
  totalRate = computed(() => {
    const start = this.heureDeDebut();
    const end = this.heureDeFin();
    const rate = this.tarifPerHours();

    if (start && end && end > start) {
      const diffInHours = end.diff(start, 'hours').hours;
      return Math.round(diffInHours * rate);
    }
    return 0;
  });

  constructor() {
    // 3. Synchronisation avec le parent (Prix et Validité)
    effect(() => {
      const currentPrice = this.totalRate();
      const isValid = currentPrice > 0;

      untracked(() => {
        if (this.totalPrice() !== currentPrice) {
          this.totalPrice.set(currentPrice);
        }
        this.stepValidityChange.emit(isValid);
      });
    }, { allowSignalWrites: true });
  }

  onTimeChange(newDate: Date, target: 'start' | 'end') {
    this.stepValidityChange.emit(true);
    if (!newDate) return;
    const newLuxon = DateTime.fromJSDate(newDate);

    if (target === 'start') {
      this.heureDeDebut.set(newLuxon);
    } else {
      this.heureDeFin.set(newLuxon);
    }
  }

  onTarifHoraireChange(tarif: number) {
    this.tarifPerHours.set(tarif);

  }
}
