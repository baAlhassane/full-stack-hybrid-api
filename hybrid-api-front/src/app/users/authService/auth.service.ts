import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, BehaviorSubject, of, Subject, filter} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any | null>(null);
 // user$ = this.userSubject.asObservable(); // Observable pour écouter les changements
  user$ = this.userSubject.asObservable().pipe(
    filter(user => user !== null) // Ne garde que les valeurs valides
  );

  isAuthenticated: boolean = false;

  API_URL = '/api';
  user:any;

  //private authenticatedSuject : Subject<boolean>=new Subject();
  private authenticatedSuject=new BehaviorSubject<boolean>(false) ;
  authenticatedSuject$=this.authenticatedSuject.asObservable();
  private router=inject(Router);

  constructor(private http: HttpClient) {}

  getUserInfo(): void {
    this.http.get<any>(`${this.API_URL}/user/me`).pipe(
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


 public emitisAutSubject(): Observable<boolean> {
    // this.getUserInfo();
    if(this.user){  return this.authenticatedSuject$; }
    return of(false);

 }

  public emitUserSubject(): Observable<any> {
    this.getUserInfo();
    return this.user$;
  }

  public toggleIsAuthenticated():void{
    this.isAuthenticated = !this.isAuthenticated;
    this.authenticatedSuject.next(this.isAuthenticated);
  }

  public upDateisAUthenticated( isAuth: boolean): void {

    this.authenticatedSuject.next(isAuth);

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

    // this.authService.authenticatedSuject$.subscribe({
    //   next: (value) => {this.isAuthenticated = value;}
    // })
    console.log(" this.isAuthenticated nlogin  ", this.isAuthenticated);
    window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';
    console.log("Utilisateur connecté ! ");
  }


  public convertArrayString(tests:string [] | string): string[]  {
    console.log("test string",tests)
    if(!Array.isArray(tests)){
     tests = tests ? [tests]:[];

    }
    // console.log("test array in authService ",tests);
    // console.log(" len(test) in authService  ",tests.length);
    return tests;
  }






}
