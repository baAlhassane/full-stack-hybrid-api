// hybrid-api-front/src/app/layout/connexion/sig-in/sig-in.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SigInComponent } from './sig-in.component'; // Assurez-vous que le chemin et le nom du composant sont corrects
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from '../../../users/authService/auth.service'; // Assurez-vous du chemin correct

describe('SigInComponent', () => { // Ligne 15, selon l'erreur
  let component: SigInComponent;
  let fixture: ComponentFixture<SigInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        SigInComponent, // Le composant standalone lui-même
        AuthService, // Fournir AuthService si SigInComponent en dépend
        importProvidersFrom(HttpClientTestingModule) // Pour HttpClient
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SigInComponent);
    component = fixture.componentInstance;

    // Si SigInComponent a des InputSignals requis, définissez-les ici
    // Exemple : fixture.componentRef.setInput('someRequiredInput', 'someValue');

    fixture.detectChanges();
  });

  // --- ASSUREZ-VOUS QU'IL Y A AU MOINS UN TEST 'it()' ICI ---
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Ajoutez d'autres tests pertinents pour SigInComponent
  // Par exemple, si SigInComponent est un formulaire de connexion :
  // it('should have a sign-in form', () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('form')).toBeTruthy();
  // });
  // --- FIN DES TESTS ---
});