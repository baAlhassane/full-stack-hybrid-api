// Importez le composant que ce fichier de test est censé tester
import { FormLoginComponent } from './form-login.component';

// Imports nécessaires pour les tests et les dépendances
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from '../../users/authService/auth.service'; // Assurez-vous que ce chemin est correct

// Le bloc 'describe' principal pour RegistrationComponent
describe('R', () => {
  let component: FormLoginComponent
  let fixture: ComponentFixture<FormLoginComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormLoginComponent//e composant standalone doit être ici
      ],
      providers: [
        AuthService, // Fournir AuthService si RegistrationComponent en dépend
        importProvidersFrom(HttpClientTestingModule) // Fournir HttpClientTestingModule pour les tests HTTP
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormLoginComponent)
    component = fixture.componentInstance;

    // --- CORRECTION POUR INPUTSIGNAL avec setInput() ---
    // Au lieu de 'component.isAuthenticated.set(false);', utilisez fixture.componentRef.setInput()
    fixture.componentRef.setInput('isAuthenticated', false); // <-- C'EST LA NOUVELLE LIGNE CLÉ !
    // --- FIN CORRECTION ---

    fixture.detectChanges(); // Déclenche la détection de changements après avoir défini l'input
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Ajoutez ici tous les autres tests spécifiques à RegistrationComponent
});