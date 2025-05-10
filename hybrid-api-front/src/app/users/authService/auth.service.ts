import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, BehaviorSubject, of, Subject, filter, audit, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Router} from "@angular/router";
import {FormLogin, User} from "../models/users";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<any | null>(null);
 private user$ = this.userSubject.asObservable().pipe(
    filter(user => user !== null) // Ne garde que les valeurs valides
  );

  private authenticatedSuject=new BehaviorSubject<boolean>(false) ;
  private authenticatedSuject$=this.authenticatedSuject.asObservable();


  isAuthenticated: boolean = false;

  API_URL = '/api';
  H_API_URL = "/api/hybrid-api";
  user:any;


  private router=inject(Router);

  constructor(private http: HttpClient) {}

  getUserInfo(): void {
    this.http.get<User>(`${this.H_API_URL}/auth/get-authenticated-user-auth0`).pipe(
      tap(userData => {
        this.user=userData;
        this.userSubject.next(userData); // Met à jour le `BehaviorSubject`
        this.isAuthenticated=true;
        this.authenticatedSuject.next(true);
        console.log("🔹--------Start ------------------------");
        console.log(" userData in getUserInfo() :  ", userData)
        console.log("🔹-------- End  ------------------------");
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
   this.http.post(`${this.H_API_URL}/auth/logout-hybrid-api`, {}, { responseType: 'text' }).subscribe(() => {
      this.userSubject.next(null); // Supprime les infos utilisateur immédiatement
      this.authenticatedSuject.next(false);
      setTimeout(() => {
        this.router.navigate(['/signin']); // Redirection propre
      }, 100);
    }, error => {
      console.error('Erreur de déconnexion', error);
    });
  }




 public emitisAutSubject(): Observable<boolean> {
   return this.authenticatedSuject$;
  }
  public emitUserSubject(): Observable<any> {
    return this.user$;
  }

  public hasAnyAuthority(authorities:string[] | string ):boolean{
    if(!this.isAuthenticated){
      return false;
    }
    if(!Array.isArray(authorities)){
      authorities=[authorities];

    }
    return this.user.tests.some((authority:string)=>authorities.includes(authority));
  }

  public loging() {
    if (!this.isAuthenticated || this.user == null) {
      console.log("Utilisateur non authentifié dans headerr.toggleShowLogging(), redirection vers /signin  ");
       this.router.navigate(['/signin']);
       // this.authenticatedSuject.next(false);
      return;
    }
    console.log("Utilisateur authentifié headerr.toggleShowLogging(), et va etre deconnecté la ligne suiviante ");
    this.logout();
    console.log("Utilisateur déconnecté dasn headerr.toggleShowLogging() ! ");
  }


  public fetchAuth0(){
    console.log(" this.isAuthenticated nlogin  ", this.isAuthenticated);
    window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';
    console.log("Utilisateur connecté ! ");
  }


  public upDateisAUthenticated( isAuth: boolean): void {
    this.authenticatedSuject.next(isAuth);
  }


  public convertArrayString(tests:string [] | string): string[]  {
    console.log("test string",tests)
    if(!Array.isArray(tests)){
     tests = tests ? [tests]:[];

    }

    return tests;
  }



  public toggleIsAuthenticated():void{
    this.isAuthenticated = !this.isAuthenticated;
    this.authenticatedSuject.next(this.isAuthenticated);
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


  //"/get-authenticated-user-auth0"

  // getLoginForm( formLogin: FormLogin,  ): Observable<FormLogin> {
  //   return this.http.post<FormLogin>(`${this.H_API_URL}/auth/get-authenticated-user-login`,formLogin);
  // }

  getRegistrationForm( formLogin: FormLogin ): Observable<FormLogin> {
    return this.http.post<FormLogin>(`${this.H_API_URL}/auth/get-authenticated-user-login`,formLogin);
  }

  getLoginForm(formLogin: FormLogin): Observable<FormLogin> {
    return this.http.post<FormLogin>(`${this.H_API_URL}/auth/get-authenticated-user-login`, formLogin).pipe(
      catchError((error) => {
        console.error('Erreur lors de l\'authentification : ', error);  // Log l'erreur complète dans la console
        if (error.status === 401) {
          console.error('Identifiants incorrects', error);
          return throwError('Identifiants incorrects');
        } else if (error.status === 0) {
          console.error('Erreur réseau ou CORS', error);
          return throwError('Erreur réseau ou CORS');
        } else if (error.status === 500) {
          console.error('Erreur interne du serveur', error);
          return throwError('Erreur interne du serveur');
        } else {
          console.error('Erreur inconnue', error);
          return throwError('Erreur inconnue');
        }
      })
    );
  }

}
