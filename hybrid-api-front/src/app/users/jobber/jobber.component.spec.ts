


// Importez les éléments nécessaires
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobberComponent } from './jobber.component'; // Adaptez au composant testé
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core'; // <-- NOUVEL IMPORT pour les standalone

describe('JobberComponent', () => { // Adaptez au nom de votre composant
  let component:JobberComponent;
  let fixture: ComponentFixture<JobberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobberComponent], // Votre composant standalone doit être ici
      providers: [
        // Fournir HttpClientTestingModule pour les composants standalone
        importProvidersFrom(HttpClientTestingModule) // <-- AJOUTEZ CECI dans 'providers'
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JobberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ... vos autres tests ...
});

describe('JobberComponent', () => {
  let component: JobberComponent;
  let fixture: ComponentFixture<JobberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
