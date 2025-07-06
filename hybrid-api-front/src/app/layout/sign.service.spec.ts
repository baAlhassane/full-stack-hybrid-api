// sign.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { SignService } from './sign.service'; // Assurez-vous du chemin correct
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from '../users/authService/auth.service'; // Si SignService dépend de AuthService

describe('SignService', () => {
  let service: SignService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SignService, // <-- AJOUTEZ LE SERVICE LUI-MÊME ICI DANS LES PROVIDERS
        AuthService, // Si SignService dépend de AuthService
        importProvidersFrom(HttpClientTestingModule) // Pour HttpClient
      ]
    });
    service = TestBed.inject(SignService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // --- AJOUTEZ AU MOINS UN TEST 'it()' ICI ---
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // --- FIN DES TESTS ---
});