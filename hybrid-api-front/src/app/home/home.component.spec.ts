// home.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from '../users/authService/auth.service'; // Assurez-vous du chemin correct

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Si HomeComponent est standalone
      providers: [
        HomeComponent, // <-- AJOUTEZ LE COMPOSANT LUI-MÊME ICI DANS LES PROVIDERS
        AuthService, // Si HomeComponent dépend de AuthService
        importProvidersFrom(HttpClientTestingModule) // Pour HttpClient
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // --- AJOUTEZ AU MOINS UN TEST 'it()' ICI ---
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // --- FIN DES TESTS ---
});