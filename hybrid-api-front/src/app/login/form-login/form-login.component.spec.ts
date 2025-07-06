

import { FormLoginComponent } from './form-login.component';

// Importez le composant que ce fichier de test est censé tester

// Note: Le chemin './x.component' est correct si x.component.spec.ts est dans le même dossier que x.component.ts

// Imports nécessaires pour les tests et HttpClient
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';

// Le bloc 'describe' doit correspondre au composant/service testé dans CE fichier
describe(' FormLoginComponent', () => { // <<< Changez 'XComponent' par le nom réel du composant (ex: 'LoginComponent', 'HomeComponent')
  let component: FormLoginComponent ; // <<< Changez 'XComponent' par le type réel du composant
  let fixture: ComponentFixture<FormLoginComponent >; // <<< Changez 'XComponent' par le type réel du composant

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormLoginComponent ], // <<< Votre composant standalone doit être ici (ex: LoginComponent, HomeComponent)
      providers: [
        // Fournir HttpClientTestingModule pour les composants standalone
        importProvidersFrom(HttpClientTestingModule) // Ceci est crucial pour les tests HTTP
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormLoginComponent ); // <<< Changez 'XComponent' par le type réel du composant
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ... vos autres tests spécifiques à XComponent ...
});

describe('FormLoginComponent', () => {
  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
