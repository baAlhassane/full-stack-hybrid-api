// Importez le composant que ce fichier de test est censé tester
import { UserInfoComponent } from './user-info.component';

// Imports nécessaires pour les tests et les dépendances
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from '../../users/authService/auth.service'; // Assurez-vous que ce chemin est correct

// Le bloc 'describe' principal pour RegistrationComponent
describe('RegistrationComponent', () => {
  let component: UserInfoComponent
  let fixture: ComponentFixture<UserInfoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserInfoComponent //e composant standalone doit être ici
      ],
      providers: [
        AuthService, // Fournir AuthService si RegistrationComponent en dépend
        importProvidersFrom(HttpClientTestingModule) // Fournir HttpClientTestingModule pour les tests HTTP
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserInfoComponent);
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