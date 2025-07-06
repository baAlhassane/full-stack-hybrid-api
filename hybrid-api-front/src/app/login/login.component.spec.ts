// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { LoginComponent } from './login.component';

// Importez HttpClientTestingModule
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component'; // Ou le composant/service que vous testez
import { AuthService } from '../users/authService/auth.service';
import { importProvidersFrom } from '@angular/core';

describe('LoginComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // Si c'est un composant standalone, incluez-le ici
        // NomDuComposant,
         LoginComponent
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


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, // Si c'est un composant standalone
        HttpClientTestingModule // <-- AJOUTEZ CECI
      ],
      // Si vous avez des providers pour AuthService ou d'autres services, assurez-vous qu'ils sont là
      // providers: [AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ... vos autres tests ...
});