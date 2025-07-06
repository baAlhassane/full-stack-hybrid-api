// registration.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from '../../../users/authService/auth.service'; // Assurez-vous du chemin correct

describe('RegistrationComponent', () => { // Ligne 15, selon l'erreur
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        RegistrationComponent, // Le composant standalone doit être ici
        AuthService, // Fournir AuthService si RegistrationComponent en dépend
        importProvidersFrom(HttpClientTestingModule) // Pour HttpClient
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;

    // Si 'isAuthenticated' est un InputSignal et qu'il est requis
    // Vérifiez si RegistrationComponent a réellement cet InputSignal
    // Si oui, décommentez et utilisez la ligne ci-dessous :
    // if (component.isAuthenticated) { 
    //     fixture.componentRef.setInput('isAuthenticated', false); 
    // }

    fixture.detectChanges();
  });

  // --- ASSUREZ-VOUS QU'IL Y A AU MOINS UN TEST 'it()' ICI ---
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Ajoutez d'autres tests pertinents pour RegistrationComponent
  // Par exemple, si RegistrationComponent affiche un formulaire d'inscription :
  // it('should display registration form', () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('form')).toBeTruthy();
  // });
  // --- FIN DES TESTS ---
});