



// Importez le composant que ce fichier de test est censé tester
import { SigInComponent } from './sig-in.component'; // Adaptez le chemin et le nom du composant
// Note: Le chemin './x.component' est correct si x.component.spec.ts est dans le même dossier que x.component.ts

// Imports nécessaires pour les tests et HttpClient
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from '../../../users/authService/auth.service';

describe('SigInComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // Si c'est un composant standalone, incluez-le ici
        // NomDuComposant,
      ],
      providers: [
        // Si c'est un service standalone, incluez-le ici
        // NomDuService,
        AuthService,
        importProvidersFrom(HttpClientTestingModule) // <-- C'EST LA CLÉ !
      ]
    }).compileComponents();
  });
  // ...
});

// Le bloc 'describe' doit correspondre au composant/service testé dans CE fichier
describe('SigInComponent', () => { // <<< Changez 'XComponent' par le nom réel du composant (ex: 'LoginComponent', 'HomeComponent')
  let component: SigInComponent; // <<< Changez 'XComponent' par le type réel du composant
  let fixture: ComponentFixture<SigInComponent>; // <<< Changez 'XComponent' par le type réel du composant

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigInComponent], // <<< Votre composant standalone doit être ici (ex: LoginComponent, HomeComponent)
      providers: [
        // Fournir HttpClientTestingModule pour les composants standalone
        importProvidersFrom(HttpClientTestingModule) // Ceci est crucial pour les tests HTTP
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SigInComponent); // <<< Changez 'XComponent' par le type réel du composant
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ... vos autres tests spécifiques à XComponent ...
});

describe('SigInComponent', () => {
  let component: SigInComponent;
  let fixture: ComponentFixture<SigInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
