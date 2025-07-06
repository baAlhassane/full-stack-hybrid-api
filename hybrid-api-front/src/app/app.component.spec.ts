// app.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from './users/authService/auth.service'; // Assurez-vous du chemin correct
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router'; // Si utilisé

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockActivatedRoute = { // Mock pour ActivatedRoute si nécessaire
    snapshot: {
      paramMap: {
        get: (key: string) => 'someValue'
      }
    },
    params: new (require('rxjs').Subject)(),
    queryParams: new (require('rxjs').Subject)(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Si AppComponent est standalone, il ne va PAS dans 'imports'
      // imports: [AppComponent], // <-- RETIREZ OU COMMENTEZ CECI

      // Au lieu de cela, ses dépendances sont fournies dans 'providers'
      providers: [
        AppComponent, // <-- AJOUTEZ LE COMPOSANT LUI-MÊME ICI DANS LES PROVIDERS
        AuthService, // Si AppComponent dépend de AuthService
        importProvidersFrom(HttpClientTestingModule), // Pour HttpClient
        importProvidersFrom(RouterTestingModule), // Pour le routage
        { provide: ActivatedRoute, useValue: mockActivatedRoute } // Si ActivatedRoute est utilisé
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Assurez-vous qu'il y a des tests 'it()' ici
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'my-projet' title`, () => {
    expect(component.title).toEqual('my-projet');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello my-projet');
  });
});