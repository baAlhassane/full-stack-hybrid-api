


// Importez les éléments nécessaires
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInfoComponent } from './user-info.component'; // Adaptez au composant testé
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core'; // <-- NOUVEL IMPORT pour les standalone

describe('UserInfoComponent', () => { // Adaptez au nom de votre composant
  let component: UserInfoComponent;
  let fixture: ComponentFixture< UserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UserInfoComponent], // Votre composant standalone doit être ici
      providers: [
        // Fournir HttpClientTestingModule pour les composants standalone
        importProvidersFrom(HttpClientTestingModule) // <-- AJOUTEZ CECI dans 'providers'
      ]
    }).compileComponents();

    fixture = TestBed.createComponent( UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ... vos autres tests ...
});

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
