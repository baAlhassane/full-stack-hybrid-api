// succses-registration.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccsesRegistrationComponent } from './succses-registration.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Si SuccsesRegistrationComponent utilise ActivatedRoute
import { Subject } from 'rxjs'; // Si vous utilisez Subject pour les mocks
import { AuthService } from '../../users/authService/auth.service'; // Assurez-vous du chemin correct si nécessaire

describe('SuccsesRegistrationComponent', () => { // Ligne 14, selon l'erreur
  let component: SuccsesRegistrationComponent;
  let fixture: ComponentFixture<SuccsesRegistrationComponent>;

  // Mock pour ActivatedRoute si nécessaire (très probable pour un composant de succès d'inscription)
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => 'someValue' // Simulez un paramètre si votre composant en lit un
      }
    },
    params: new Subject(),
    queryParams: new Subject(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        SuccsesRegistrationComponent, // Le composant standalone doit être ici
        AuthService, // Fournir AuthService si SuccsesRegistrationComponent en dépend
        importProvidersFrom(HttpClientTestingModule), // Pour HttpClient
        { provide: ActivatedRoute, useValue: mockActivatedRoute } // Fournir le mock ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SuccsesRegistrationComponent);
    component = fixture.componentInstance;

    // Si 'isAuthenticated' est un InputSignal et qu'il est requis
    if (component.isAuthenticated) {
        fixture.componentRef.setInput('isAuthenticated', false); // Ou la valeur par défaut appropriée
    }

    fixture.detectChanges();
  });

  // --- ASSUREZ-VOUS QU'IL Y A AU MOINS UN TEST 'it()' ICI ---
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Ajoutez d'autres tests pertinents pour SuccsesRegistrationComponent
  // Par exemple, vérifier le message de succès, la redirection, etc.
  // it('should display success message', () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.textContent).toContain('Inscription réussie !');
  // });
  // --- FIN DES TESTS ---
});