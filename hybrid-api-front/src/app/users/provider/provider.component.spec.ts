// hybrid-api-front/src/app/users/provider/provider.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProviderComponent } from './provider.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from '../authService/auth.service'; // Assurez-vous que ce chemin est correct

describe('ProviderComponent', () => { // Ligne 14, selon l'erreur
  let component: ProviderComponent;
  let fixture: ComponentFixture<ProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ProviderComponent, // Le composant standalone lui-même
        AuthService, // Fournir AuthService si ProviderComponent en dépend
        importProvidersFrom(HttpClientTestingModule) // Pour HttpClient
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProviderComponent);
    component = fixture.componentInstance;

    // Si ProviderComponent a des InputSignals requis, définissez-les ici
    // Exemple : fixture.componentRef.setInput('someRequiredInput', 'someValue');

    fixture.detectChanges();
  });

  // --- ASSUREZ-VOUS QU'IL Y A AU MOINS UN TEST 'it()' ICI ---
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Ajoutez d'autres tests pertinents pour ProviderComponent
  // Par exemple, si ProviderComponent affiche des informations sur le fournisseur :
  // it('should display provider information', () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.textContent).toContain('Provider Details');
  // });
  // --- FIN DES TESTS ---
});