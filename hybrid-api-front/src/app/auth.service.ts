import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any | null>(null);
  user$ = this.userSubject.asObservable(); // Observable pour écouter les changements

  API_URL = '/api';

  constructor(private http: HttpClient) {}

  getUserInfo(): void {
    this.http.get<any>(`${this.API_URL}/user/me`).pipe(
      tap(user => {
        this.userSubject.next(user); // Met à jour le `BehaviorSubject`
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';
        }
        this.userSubject.next(null); // Met à jour avec `null` si non authentifié
        return of(null);
      })
    ).subscribe();
  }

  logout(): void {
    this.http.post(`${this.API_URL}/user/logout`, {}, { responseType: 'text' }).subscribe(() => {
      this.userSubject.next(null); // Supprime les infos utilisateur immédiatement
      setTimeout(() => {
        window.location.href = '/login'; // Redirige vers la page de login
      }, 100);
    }, error => {
      console.error('Erreur de déconnexion', error);
    });
  }

  logoutHybridApi(): void {
    this.http.post(`${this.API_URL}/hybrid-api/auth/logout-hybrid-api`, {}, { responseType: 'text' }).subscribe(() => {
      this.userSubject.next(null); // Supprime les infos utilisateur immédiatement
      setTimeout(() => {
        window.location.href = '/login'; // Redirige vers la page de login
      }, 100);
    }, error => {
      console.error('Erreur de déconnexion', error);
    });
  }


}
