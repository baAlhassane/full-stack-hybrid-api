// import { TestBed } from '@angular/core/testing';

// import { AuthService } from './auth.service';

describe('AuthService', () => {
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

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Importez aussi HttpTestingController
import { AuthService } from './auth.service';
import { importProvidersFrom } from '@angular/core';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController; // Pour mocker les requêtes HTTP

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule // <-- AJOUTEZ CECI
      ],
      providers: [AuthService] // Le service que vous testez
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController); // Initialiser le contrôleur de mock
  });

  afterEach(() => {
    httpTestingController.verify(); // Vérifie qu'aucune requête HTTP en attente n'est restée
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ... vos tests de méthodes de service qui font des requêtes HTTP ...
});