

// Importez le composant que ce fichier de test est censé tester
import { UserComponent } from './user.component'; // Adaptez le chemin et le nom du composant
// Note: Le chemin './x.component' est correct si x.component.spec.ts est dans le même dossier que x.component.ts

// Imports nécessaires pour les tests et HttpClient
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('UserCoponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // Si c'est un composant standalone, incluez-le ici
        // NomDuComposant,
        UserComponent
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
import { importProvidersFrom } from '@angular/core';
import { AuthService } from '../authService/auth.service';

// Le bloc 'describe' doit correspondre au composant/service testé dans CE fichier
describe('UserComponent', () => { // <<< Changez 'XComponent' par le nom réel du composant (ex: 'LoginComponent', 'HomeComponent')
  let component:  UserComponent; // <<< Changez 'XComponent' par le type réel du composant
  let fixture: ComponentFixture< UserComponent>; // <<< Changez 'XComponent' par le type réel du composant

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UserComponent], // <<< Votre composant standalone doit être ici (ex: LoginComponent, HomeComponent)
      providers: [
        // Fournir HttpClientTestingModule pour les composants standalone
        importProvidersFrom(HttpClientTestingModule) // Ceci est crucial pour les tests HTTP
      ]
    }).compileComponents();

    fixture = TestBed.createComponent( UserComponent); // <<< Changez 'XComponent' par le type réel du composant
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ... vos autres tests spécifiques à XComponent ...
});

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
