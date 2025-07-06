// header.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from '../../users/authService/auth.service'; // Assurez-vous du chemin correct
import { RouterTestingModule } from '@angular/router/testing'; // Si HeaderComponent utilise le router
import { ActivatedRoute } from '@angular/router'; // Si HeaderComponent utilise ActivatedRoute
import { Subject } from 'rxjs'; // Si vous utilisez Subject pour les mocks

describe('HeaderComponent', () => { // Ligne 13, selon l'erreur
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  // Mock pour ActivatedRoute si nécessaire
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => 'someValue'
      }
    },
    params: new Subject(),
    queryParams: new Subject(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HeaderComponent, // Le composant standalone doit être ici
        AuthService, // Si HeaderComponent dépend de AuthService
        importProvidersFrom(HttpClientTestingModule), // Pour HttpClient
        importProvidersFrom(RouterTestingModule), // Pour le routage
        { provide: ActivatedRoute, useValue: mockActivatedRoute } // Si ActivatedRoute est utilisé
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
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

  // Ajoutez d'autres tests pertinents pour HeaderComponent
  // Par exemple, vérifier la présence d'éléments de navigation, etc.
  // it('should display navigation links', () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('nav a')).toBeTruthy();
  // });
  // --- FIN DES TESTS ---
});