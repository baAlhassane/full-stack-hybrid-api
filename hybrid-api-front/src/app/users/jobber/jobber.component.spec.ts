// jobber.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobberComponent } from './jobber.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from '../authService/auth.service'; // Assurez-vous du chemin correct

describe('JobberComponent', () => { // Ligne 13, selon l'erreur
  let component: JobberComponent;
  let fixture: ComponentFixture<JobberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        JobberComponent, // Le composant standalone doit être ici
        AuthService, // Fournir AuthService si JobberComponent en dépend
        importProvidersFrom(HttpClientTestingModule) // Pour HttpClient
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JobberComponent);
    component = fixture.componentInstance;

    // Si 'isAuthenticated' est un InputSignal et qu'il est requis
    // if (component.isAuthenticated) { // Décommentez si JobberComponent a cet input
    //     fixture.componentRef.setInput('isAuthenticated', false); 
    // }

    fixture.detectChanges();
  });

  // --- ASSUREZ-VOUS QU'IL Y A AU MOINS UN TEST 'it()' ICI ---
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Ajoutez d'autres tests pertinents pour JobberComponent
  // Par exemple, si JobberComponent affiche des informations sur l'utilisateur :
  // it('should display jobber information', () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.textContent).toContain('Jobber Details');
  // });
  // --- FIN DES TESTS ---
});