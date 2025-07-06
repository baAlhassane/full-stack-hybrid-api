// hybrid-api-front/src/app/users/user/user.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component'; // Assurez-vous que le nom du composant est correct (UserComponent et non UserCoponent)
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from '../authService/auth.service'; // Assurez-vous du chemin correct

describe('UserComponent', () => { // Ligne 12, selon l'erreur
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        UserComponent, // Le composant standalone lui-même
        AuthService, // Fournir AuthService si UserComponent en dépend
        importProvidersFrom(HttpClientTestingModule) // Pour HttpClient
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;

    // Si UserComponent a des InputSignals requis, définissez-les ici
    // Exemple : fixture.componentRef.setInput('someRequiredInput', 'someValue');

    fixture.detectChanges();
  });

  // --- ASSUREZ-VOUS QU'IL Y A AU MOINS UN TEST 'it()' ICI ---
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Ajoutez d'autres tests pertinents pour UserComponent
  // Par exemple, si UserComponent affiche des informations sur l'utilisateur :
  // it('should display user information', () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.textContent).toContain('User Details');
  // });
  // --- FIN DES TESTS ---
});