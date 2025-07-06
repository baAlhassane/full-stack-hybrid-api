
import { SignService } from './sign.service';


// Importez le service que ce fichier de test est censé tester


// Imports nécessaires pour les tests et HttpClient
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';

// Le bloc 'describe' doit correspondre au service testé dans CE fichier
describe('XService', () => { // <<< Changez 'XService' par le nom réel du service (ex: 'AuthService', 'SignService')
  let service:  SignService; // <<< Changez 'XService' par le type réel du service
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
         SignService, // <<< Votre service standalone doit être ici (ex: AuthService, SignService)
        importProvidersFrom(HttpClientTestingModule) // Ceci est crucial pour les tests HTTP
      ]
    });
    service = TestBed.inject( SignService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ... vos autres tests spécifiques à XService ...
});
describe('SignService', () => {
  let service: SignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
