import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, BehaviorSubject, of, Subject} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any | null>(null);
  user$ = this.userSubject.asObservable(); // Observable pour écouter les changements
  isAuthenticated: boolean = false;

  API_URL = '/api';
  user:any;

  private authenticatedSuject : Subject<boolean>=new Subject();
  authenticatedSuject$=this.authenticatedSuject.asObservable();
  private router=inject(Router);

  constructor(private http: HttpClient) {}

  getUserInfo(): void {
    this.http.get<any>(`${this.API_URL}/user/me`).pipe(
      tap(userData => {
        this.user=userData;
        this.userSubject.next(userData); // Met à jour le `BehaviorSubject`
        this.isAuthenticated=true;
        this.authenticatedSuject.next(this.isAuthenticated);
        console.log(" user in getUserInfo() :  ", userData)
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
  //auth.service.ts
  logout(): void {
    this.http.post(`${this.API_URL}/user/logout`, {}, { responseType: 'text' }).subscribe(() => {
      this.userSubject.next(null); // Supprime les infos utilisateur immédiatement
      setTimeout(() => {
        this.authenticatedSuject.next(false);
        this.router.navigate(['/signin']); // Redirection propre
        // window.location.href = '/signin';
        //window.location.href = '/login'; // Redirige vers la page de login
      }, 100);
    }, error => {
      console.error('Erreur de déconnexion', error);
    });
  }

  logoutHybridApi(): void {
    this.http.post(`${this.API_URL}/hybrid-api/auth/logout-hybrid-api`, {}, { responseType: 'text' }).subscribe(() => {
      this.userSubject.next(null); // Supprime les infos utilisateur immédiatement
      setTimeout(() => {
        this.authenticatedSuject.next(true);
        window.location.href = '/login'; // Redirige vers la page de login

      }, 100);
    }, error => {
      console.error('Erreur de déconnexion', error);
    });
  }


 public emitSubject(): Observable<boolean> {
    return this.authenticatedSuject$;
 }

  public emitUserSubject(): Observable<any> {
    return this.user$;
  }

  public toggleIsAuthenticated():void{
    this.isAuthenticated = !this.isAuthenticated;
    this.authenticatedSuject.next(this.isAuthenticated);
  }

  public upDateisAUthenticated( b: boolean): void {

    this.authenticatedSuject.next(this.isAuthenticated);

  }

  public hasAnyAuthority(authorities:string[] | string ):boolean{
    if(!this.isAuthenticated){
      return false;
    }

    if(!Array.isArray(authorities)){
      authorities=[authorities];

    }

    return this.user.some((authority:string)=>authorities.includes(authority));
  }

}
