// auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';

describe('AuthService', () => { // Ligne 5, selon l'erreur
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService, // Le service standalone doit être ici
        importProvidersFrom(HttpClientTestingModule) // Pour HttpClient
      ]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Vérifie qu'aucune requête HTTP en attente n'est restée
  });

  // --- ASSUREZ-VOUS QU'IL Y A AU MOINS UN TEST 'it()' ICI ---
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Ajoutez d'autres tests pertinents pour AuthService, par exemple:
  // it('should send a login request', () => {
  //   service.login('test@example.com', 'password').subscribe();
  //   const req = httpTestingController.expectOne('http://your-api-url/login'); // Remplacez par votre URL réelle
  //   expect(req.request.method).toEqual('POST');
  //   req.flush({ token: 'fake-token' });
  // });
  // --- FIN DES TESTS ---
});