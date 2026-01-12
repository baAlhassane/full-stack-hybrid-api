import {Component, model, signal, inject, output, computed, AfterViewInit, OnInit} from '@angular/core'; // Ajout de inject
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Nécessaire pour [(ngModel)]
import { AutoCompleteModule } from 'primeng/autocomplete'; // Nécessaire pour p-autoComplete
import { InputTextModule } from 'primeng/inputtext'; // Nécessaire pour pInputText
// import { JobMapService } from '../votre-chemin/job-map.service'; // Ajuste le chemin
// import { Address } from '../votre-chemin/address.model';
import {JobMapService} from "../job-map.service";
import {Address} from "../../job.model";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";

@Component({
  selector: 'app-address-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    InputTextModule
  ],
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.css']
})
export class AddressSearchComponent implements OnInit {
  // Correction de l'erreur TS2304 & TS2564 : Injection correcte
  private mapService = inject(JobMapService);

  // Correction de l'erreur NG9 : Déclarations explicites
  searchQuery: string = '';
  suggestions: any[] = [];

  fullLocation = model<Address | null>(null);
  stepValidityChange=output<boolean>();
  addressDetails = signal<Address>({
    country: '',
    city: '',
    street: '',
    houseNumber: "",
    latitude: null,
    longitude: null
  });

  private searchTerms = new Subject<string>();
   houseNumberAndStreetAndCity=model<string>("");

  ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(300),        // Attendre 300ms de pause dans la frappe
      distinctUntilChanged()    // Ne pas relancer si c'est la même recherche
    ).subscribe(term => {
      this.mapService.searchAddress(term).subscribe(data => {
        console.log("queryValue data : ",data);
        this.suggestions = data;
      });
    });
  }

  onSearch(event: any) {
    this.searchTerms.next(event.query);
  }

  // Correction de l'erreur NG5 : Utilisation du type correct pour l'événement
  // onSearch(event: any): void {
  //   const queryValue = event.query;
  //   this.mapService.searchAddress(queryValue).subscribe({
  //     next: (data: any[]) => {
  //       console.log("queryValue data : ",data);
  //       this.suggestions = data;
  //       this.stepValidityChange.emit(true);
  //     },
  //     error: (err: any) => { // Correction TS7006 : Type explicite pour err
  //       console.error('Erreur :', err);
  //       this.suggestions = [];
  //     }
  //   });
  // }

  // onAddressSelect(event: any): void {
  //   const node = event.value;
  //   const addr = node.address;
  //
  //   const extracted: Address = {
  //     country: addr?.country || '',
  //     city: addr?.city || addr?.town || addr?.village || '',
  //     street: (addr?.house_number ? addr.house_number + ' ' : '') + (addr?.road || ''),
  //     latitude: parseFloat(node.lat),
  //     longitude: parseFloat(node.lon)
  //   };
  //
  //   this.addressDetails.set(extracted);
  //   this.fullLocation.set(extracted);
  // }


  // Met à jour le parent dès qu'on change un champ manuellement
  updateModel() {
    this.fullLocation.set({ ...this.addressDetails() });
    this.stepValidityChange.emit(true);

  }

  onAddressSelect(event: any): void {
    const node = event.value;
    const addr = node.address;


    // On extrait proprement les morceaux
    const extracted: Address = {
      street:  (addr?.road || addr?.pedestrian || '') ,
      city: addr?.city || addr?.town || addr?.village || '',
      country: addr?.country || '',
      houseNumber: (addr?.house_number ? addr.house_number + ' ' : ''),
      latitude: parseFloat(node.lat),
      longitude: parseFloat(node.lon)
    };
  this.houseNumberAndStreetAndCity.set(extracted.houseNumber + " " +extracted.street +" " +extracted.city );
    // On met à jour les champs
    this.addressDetails.set(extracted);

    // On vide le champ de recherche pour plus de clarté
   // this.searchQuery =  extracted.street + ', ' + extracted.city;
    this.searchQuery =extracted.houseNumber + " " +extracted.street + (extracted.city ? ', ' + extracted.city : '');
    // On notifie le parent
    this.fullLocation.set(extracted);
    this.stepValidityChange.emit(true);
  }
}
