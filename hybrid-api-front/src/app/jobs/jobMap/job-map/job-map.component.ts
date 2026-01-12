import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-job-map',
  standalone: true,
  template: `<div id="map" style="height: 500px; width: 100%;"></div>`,
  styles: [`#map { border-radius: 8px; }`]
})
export class JobMapComponent implements AfterViewInit {
  @Input() jobs: any[] = []; // Liste des jobs venant du backend
  private map: any;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // 1. Initialisation sur une position par défaut (ex: Paris)
    this.map = L.map('map').setView([48.8566, 2.3522], 12);

    // 2. Chargement des tuiles (design de la carte)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // 3. Ajout des marqueurs pour chaque job
    this.jobs.forEach(job => {
      if (job.latitude && job.longitude) {
        const marker = L.marker([job.latitude, job.longitude]);
        marker.bindPopup(`<b>${job.title}</b><br>${job.price}€`);
        marker.addTo(this.map);
      }
    });
  }
}
