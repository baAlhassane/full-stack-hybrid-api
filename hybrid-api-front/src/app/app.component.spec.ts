import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from './users/authService/auth.service';// Assurez-vous du chemin correct si AppComponent utilise AuthService
import { RouterTestingModule } from '@angular/router/testing'; // Souvent nécessaire pour AppComponent

describe('AppComponent', () => { // Ligne 13, selon l'erreur
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, // Votre composant standalone
        RouterTestingModule, // Si votre AppComponent utilise le router (routerLink, routerOutlet)
        // Ajoutez HttpClientTestingModule si AppComponent utilise HttpClient ou AuthService
        importProvidersFrom(HttpClientTestingModule)
      ],
      providers: [
        AuthService // Si AppComponent dépend de AuthService
        // Ajoutez d'autres providers si nécessaire
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // --- ASSUREZ-VOUS QU'IL Y A AU MOINS UN TEST 'it()' ICI ---
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'my-projet' title`, () => {
    expect(component.title).toEqual('my-projet');
  });

  // Exemple si AppComponent rend un titre dans le template
  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello my-projet');
  });
  // --- FIN DES TESTS ---
});