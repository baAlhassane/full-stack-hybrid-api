// login.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from '../users/authService/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        LoginComponent, // Le composant standalone doit être ici
        AuthService,
        importProvidersFrom(HttpClientTestingModule)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    // Si 'isAuthenticated' est un InputSignal et qu'il est requis
    if (component.isAuthenticated()) {
        fixture.componentRef.setInput('isAuthenticated', false);
    }

    fixture.detectChanges(); // Déclenche la détection de changements
  });

  // --- ASSUREZ-VOUS QUE CE TEST 'it()' EST PRÉSENT ET NON COMMENTÉ ---
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Ajoutez d'autres tests pertinents pour LoginComponent si vous en avez
  // Par exemple, si vous avez un formulaire de connexion :
  // it('should have a login form', () => {
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('form')).toBeTruthy();
  // });
});