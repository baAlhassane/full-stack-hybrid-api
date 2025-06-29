import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject, of, Subject, filter, audit, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Router} from "@angular/router";
import {FormLogin, FormRegister, RegistrationResponse, User} from "../models/users";

// Importez votre objet environment
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable().pipe(
    filter(user => user !== null)
  );

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  // Supprimez ces lignes ou commentez-les pour éviter la confusion
  // API_URL = '/api'; // Inutile si vous utilisez environment.API_URL
  // H_API_URL = "http://localhost:8080/api/hybrid-api" // <-- SUPPRIMEZ OU COMMENTEZ CETTE LIGNE
  user: any;

  private router = inject(Router);

  private validationErrors: { [key: string]: string } = {};
  private validationErrorsSubject = new BehaviorSubject<any>(this.validationErrors);
  validationErrorsObs = this.validationErrorsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUserInfo(): void {
    const token = this.getToken();
    console.log("getUserInfo() called.");
    if (!token) {
      console.warn("Token is null in getUserInfo(). Cannot fetch user info.");
      this.userSubject.next(null);
      return;
    }
    console.log("tocken ", token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    // Utilisez environment.API_URL ici
    this.http.get<User>(`${environment.API_URL}/auth/get-authenticated-user-auth0`, { headers: headers }).pipe(
      tap(userData => {
        this.userSubject.next(userData);
        this.isAuthenticated.next(true);
        console.log("🔹--------Start ------------------------");
        console.log(" userData in getUserInfo() : ", userData);
        console.log("🔹-------- End ------------------------");
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("❌ [AuthService] Erreur lors de la récupération de l'utilisateur :", error);
        if (error.status === 401 || error.status === 403) {
          console.warn("Unauthorized or Forbidden access. Clearing token.");
          this.removeToken();
          this.router.navigate(['/login']);
        }
        this.userSubject.next(null);
        this.isAuthenticated.next(false);
        return of(null);
      })
    ).subscribe({
      next: (user) => {
        console.log("✅ [AuthService] Utilisateur récupéré avec succès (abonnement interne) :", user);
      },
      error: (err) => {
        console.error("❌ [AuthService] Erreur critique dans l'abonnement interne de getUserInfo:", err);
      },
      complete: () => {
        console.log("ℹ️ [AuthService] getUserInfo terminé (abonnement interne).");
      }
    });
  }

  logout(): void {
    // Utilisez environment.API_URL ici
    this.http.post(`${environment.API_URL}/auth/logout-hybrid-api`, {}, { responseType: 'text' }).subscribe(() => {
      this.userSubject.next(null);
      this.isAuthenticated.next(false);
      this.validationErrorsSubject.next({});
      setTimeout(() => {
        this.router.navigate(['/signin']);
      }, 100);
    }, error => {
      console.error('Erreur de déconnexion', error);
    });
  }

  public emitisAutSubject(): Observable<boolean> {
    return this.isAuthenticated$;
  }
  public emitUserSubject(): Observable<User | null> {
    return this.user$;
  }

  public hasAnyAuthority(authorities:string[] | string ):boolean{
    // Fix: Utilisez .value pour accéder à la valeur d'un BehaviorSubject
    if(!this.isAuthenticated.value){
      return false;
    }
    if(!Array.isArray(authorities)){
      authorities=[authorities];
    }
    // Assurez-vous que this.user n'est pas null et qu'il a une propriété 'tests'
    return this.user && this.user.tests && this.user.tests.some((authority:string)=>authorities.includes(authority));
  }

  public loging() {
    // Fix: Utilisez .value pour accéder à la valeur d'un BehaviorSubject
    if (!this.isAuthenticated.value) {
      console.log("Utilisateur non authentifié dans headerr.toggleShowLogging(), redirection vers /signin ");
        this.router.navigate(['/signin']);
      return;
    }
    console.log("Utilisateur authentifié headerr.toggleShowLogging(), et va etre deconnecté la ligne suiviante ");
    this.logout();
    console.log("Utilisateur déconnecté dasn headerr.toggleShowLogging() ! ");
  }

  loginForm(email: string, password: string): void {
    // Utilisez environment.API_URL ici
    this.http.post<User>(`${environment.API_URL}/auth/login`, { email, password }, { withCredentials: true }).subscribe({
      next: response => {
        this.userSubject.next(response);
        this.isAuthenticated.next(true);
        console.log("Login success", response);
      },
      error: error => {
        if(error.status === 401 || (typeof error.error === 'string' && error.error.includes('Identifiants invalides (email ou mot de passe incorrect).' ))){
          this.validationErrors = { email: error.error };
          this.validationErrorsSubject.next(this.validationErrors);
        }
        console.error("Login failed", error);
      }
    });
  }

  registerForm(email: string, password: string): Observable<any> {
    // Utilisez environment.API_URL ici
    return this.http.post(`${environment.API_URL}/auth/registration`, { email, password}, { withCredentials: true });
  }

  registrationResponse: RegistrationResponse = {
    success: false,
    message:"",
    fullName:"",
  }

  private registrationResponseObs = new BehaviorSubject<RegistrationResponse>(this.registrationResponse);
  private registrationResponse$ = this.registrationResponseObs.asObservable();

  postRegistrationForm(formregister: FormRegister ) {
    // Utilisez environment.API_URL ici
    this.http.post<RegistrationResponse>(`${environment.API_URL}/auth/register`,formregister, { withCredentials: true }).subscribe(
      {
        next: (form) => {
          this.registrationResponse = form;
          this.registrationResponseObs.next(form);
          this.router.navigate(['/successregestration']);
          console.log("form registration ", form);
        },
        error: error => {
          if (error.status === 409 || (typeof error.error === 'string' && error.error.includes('Email is already taken'))) {
            this.validationErrors = { email: error.error };
            this.validationErrorsSubject.next(this.validationErrors);
            console.log("test ", this.validationErrors['email'] );
          }
        }
      });
  }

  getvalidationErrorsObs():Observable<any> {
    return this.validationErrorsObs;
  }

  getRegistrationResponse(): Observable<RegistrationResponse> {
    return this.registrationResponse$;
  }

  public fetchAuth0(){
    console.log(" this.isAuthenticated nlogin ", this.isAuthenticated);
    // Pour Auth0, l'URL de redirection doit être l'URL où votre backend expose Auth0.
    // Cette URL est typiquement une URL du backend et non via API_URL car c'est une redirection directe du navigateur.
    // Gardez-la telle quelle si elle fonctionne (http://localhost:8080/oauth2/authorization/auth0)
    window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';
    console.log("Utilisateur connecté ! ");
  }

  public upDateisAUthenticated( isAuth: boolean): void {
    this.isAuthenticated.next(isAuth);
  }

  public convertArrayString(tests:string [] | string): string[] {
    console.log("test string",tests)
    if(!Array.isArray(tests)){
      tests = tests ? [tests]:[];
    }
    return tests;
  }

  public toggleIsAuthenticated():void{
    this.isAuthenticated.next(!this.isAuthenticated.value);
  }

  // Cette méthode semble être un doublon de 'logout()', à revoir
  logoutHybridApi(): void {
    // Utilisez environment.API_URL ici aussi
    this.http.post(`${environment.API_URL}/auth/logout-hybrid-api`, {}, { responseType: 'text' }).subscribe(() => {
      this.userSubject.next(null);
      setTimeout(() => {
        this.isAuthenticated.next(true); // Est-ce que ce devrait être false après déconnexion ?
        window.location.href = '/login';
      }, 100);
    }, error => {
      console.error('Erreur de déconnexion', error);
    });
  }

  setPassword(email: string, password: string): Observable<void> {
    // Utilisez environment.API_URL ici
    return this.http.post<void>(`${environment.API_URL}/auth/set-password`, {
      email,
      password
    });
  }

  private tokenKey = 'auth_token';

  public setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
    this.isAuthenticated.next(false);
  }

  initAuth(): void {
    const token = this.getToken();
    if (token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
}