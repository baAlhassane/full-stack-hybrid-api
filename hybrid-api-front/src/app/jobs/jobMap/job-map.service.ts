import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class JobMapService {
  constructor(private http: HttpClient) {}
// Dans ton JobMapService

  searchAddress(query: string): Observable<any[]> {
    // 1. On nettoie la requête
    const cleanQuery = encodeURIComponent(query);

    // 2. On utilise une URL plus robuste
    // viewbox et bounded permettent de donner la priorité à une zone (ex: ta ville)
    const url = `https://nominatim.openstreetmap.org/search?` +
      `format=json&` +
      `q=${cleanQuery}&` +
      `addressdetails=1&` +
      `limit=10&` + // On augmente un peu la limite pour avoir plus de choix
      `countrycodes=fr&` +
      `featuretype=settlement,street`; // On force la recherche sur les villes et rues

    return this.http.get<any[]>(url);
  }


//   searchAddress(query: string): Observable<any[]> {
//     // Ajout de &countrycodes=fr pour limiter à la France
//     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5&countrycodes=fr`;
//     return this.http.get<any[]>(url);
//   }

  // searchAddress(query: string): Observable<any[]> {
  //   const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5`;
  //   return this.http.get<any[]>(url);
  // }

}
