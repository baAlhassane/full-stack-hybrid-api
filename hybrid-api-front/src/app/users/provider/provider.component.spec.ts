

// Importez le composant que ce fichier de test est censé tester
import { ProviderComponent} from '../provider/provider.component'; // Adaptez le chemin et le nom du composant
// Note: Le chemin './x.component' est correct si x.component.spec.ts est dans le même dossier que x.component.ts

// Imports nécessaires pour les tests et HttpClient
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';

// Le bloc 'describe' doit correspondre au composant/service testé dans CE fichier
describe('XComponent', () => { // <<< Changez 'XComponent' par le nom réel du composant (ex: 'LoginComponent', 'HomeComponent')
  let component: ProviderComponent; // <<< Changez 'XComponent' par le type réel du composant
  let fixture: ComponentFixture<ProviderComponent>; // <<< Changez 'XComponent' par le type réel du composant

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderComponent], // <<< Votre composant standalone doit être ici (ex: LoginComponent, HomeComponent)
      providers: [
        // Fournir HttpClientTestingModule pour les composants standalone
        importProvidersFrom(HttpClientTestingModule) // Ceci est crucial pour les tests HTTP
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProviderComponent); // <<< Changez 'XComponent' par le type réel du composant
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ... vos autres tests spécifiques à XComponent ...
});
describe('ProviderComponent', () => {
  let component: ProviderComponent;
  let fixture: ComponentFixture<ProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
