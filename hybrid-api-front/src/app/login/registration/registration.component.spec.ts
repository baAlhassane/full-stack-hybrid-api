// registration.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from '../../users/authService/auth.service'; // Assurez-vous que ce chemin est correct

describe('RegistrationComponent', () => { // Ligne 15, selon l'erreur
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        RegistrationComponent, // Le composant standalone lui-même
        AuthService, // Fournir AuthService si RegistrationComponent en dépend
        importProvidersFrom(HttpClientTestingModule) // Pour HttpClient
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;

    // --- RE-AJOUTEZ CETTE SECTION ---
    // Si 'isAuthenticated' est un InputSignal requis dans RegistrationComponent, définissez sa valeur ici.
    // D'après l'erreur NG0950, il EST requis.
    fixture.componentRef.setInput('isAuthenticated', false); // Fournir une valeur par défaut
    // --- FIN RE-AJOUT ---

    fixture.detectChanges(); // Déclenche la détection de changements après avoir défini l'input
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Ajoutez d'autres tests pertinents pour RegistrationComponent ici
});