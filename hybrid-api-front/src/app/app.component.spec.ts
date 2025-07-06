// app.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { AuthService } from './users/authService/auth.service';// Assurez-vous du chemin correct
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs'; // <-- NOUVEL IMPORT : Importez Subject directement de 'rxjs'

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockActivatedRoute = { // Mock pour ActivatedRoute si nécessaire
    snapshot: {
      paramMap: {
        get: (key: string) => 'someValue'
      }
    },
    // --- CORRECTION ICI ---
    params: new Subject(), // <-- Utilisez 'Subject' directement
    queryParams: new Subject(), // <-- Utilisez 'Subject' directement
    // --- FIN CORRECTION ---
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AppComponent,
        AuthService,
        importProvidersFrom(HttpClientTestingModule),
        importProvidersFrom(RouterTestingModule),
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

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