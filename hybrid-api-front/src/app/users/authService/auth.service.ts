import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Observable, BehaviorSubject, of, Subject, filter, audit, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Router} from "@angular/router";
import {AppUser, FormLogin, FormRegister, RegistrationResponse, User} from "../models/users";
// import {environment} from "../../../environments/environment";
import {environment} from "../../../environments/environment.development";
import {ChatService} from "../../websocket/chat.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<AppUser | null>(null);
 public user$ = this.userSubject.asObservable().pipe(
    filter(user => user !== null) // Ne garde que les valeurs valides
  );

  private isAuthenticated=new BehaviorSubject<boolean>(false) ;
  isAuthenticated$=this.isAuthenticated.asObservable();


  //API_URL = '/api';
   API_URL = "/api/hybrid-api";
  user: User | null = null;



  private router=inject(Router);


  private validationErrors: { [key: string]: string } = {};
  private validationErrorsSubject=new BehaviorSubject<any>(this.validationErrors) ;
  validationErrorsObs=this.validationErrorsSubject.asObservable();
  private chatService: ChatService=inject(ChatService);


  constructor(private http: HttpClient) {
      this.initAuth(); // Restaure l'état dès que le service est créé
  }

// MODIFIÉ : getUserInfo() ne retourne PLUS un Observable.
  // L'abonnement est géré en interne.
  getUserInfo(): void { // Le type de retour est 'void'
    const token = this.getToken();
    console.log("getUserInfo() called.");
    if (!token) {
      console.warn("Token is null in getUserInfo(). Cannot fetch user info.");
      this.userSubject.next(null);
     // this.authenticatedSuject.next(false);
      return; // Retourne simplement, car il n'y a pas d'Observable à retourner
    }
    console.log("tocken ", token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<User>(`${this.API_URL}/auth/get-authenticated-user-auth0`, { headers: headers }).pipe(
      tap(userData => {
        this.userSubject.next(userData);
        this.isAuthenticated.next(true);
        console.log("🔹--------Start ------------------------");
        console.log(" userData in getUserInfo() : ", userData);
        console.log("🔹-------- End  ------------------------");
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("❌ [AuthService] Erreur lors de la récupération de l'utilisateur :", error);
        if (error.status === 401 || error.status === 403) {
          console.warn("Unauthorized or Forbidden access. Clearing token.");
          this.removeToken(); // Supprime le token invalide
          this.router.navigate(['/login']); // Redirige vers la page de login
        }
        this.userSubject.next(null);
        this.isAuthenticated.next(false);
        return of(null); // Retourne un Observable de null pour que le pipe continue sans erreur pour le subscribe interne
      })
    ).subscribe({
      next: (user) => {
        console.log("✅ [AuthService] Utilisateur récupéré avec succès (abonnement interne) :", user);
        // Ici, vous pourriez déclencher une action ou une redirection si nécessaire,
        // mais le CallbackComponent est généralement responsable de la redirection finale.
      },
      error: (err) => {
        console.error("❌ [AuthService] Erreur critique dans l'abonnement interne de getUserInfo:", err);
      },
      complete: () => {
        console.log("ℹ️ [AuthService] getUserInfo terminé (abonnement interne).");
      }
    });
  }

  //auth.service.ts
  logout(): void {
    const currentUser = this.userSubject.value;

    if(currentUser){
      this.chatService.leaveAllRooms(currentUser);
    }
   this.http.post(`${environment.API_URL}/auth/logout-hybrid-api`, {}, { responseType: 'text' }).subscribe(() => {

      this.userSubject.next(null); // Supprime les infos utilisateur immédiatement
      this.isAuthenticated.next(false);
      this.validationErrorsSubject.next({});
      setTimeout(() => {
        this.router.navigate(['/signin']); // Redirection propre
      }, 100);
    }, error => {
      console.error('Erreur de déconnexion', error);
    });
  }

 public emitisAutSubject(): Observable<boolean> {
   return this.isAuthenticated$;
  }
  public emitUserSubject(): Observable<AppUser | null> {
    return this.user$;
  }

  public hasAnyAuthority(authorities:string[] | string ):boolean{
    if(!this.isAuthenticated){
      return false;
    }
    if(!Array.isArray(authorities)){
      authorities=[authorities];

    }
   // return this.user.some((authority:string)=>authorities.includes(authority));
    return <boolean>this.user?.authorities.some((authority: string) => authorities.includes(authority));
  }

  public loging() {
    console.log("this.isthenticated before :  ",this.isAuthenticated.value);
    if (!this.isAuthenticated.value) {
      console.log("this.isthenticated after:  ",this.isAuthenticated.value);
      console.log("Utilisateur non authentifié dans headerr.toggleShowLogging(), redirection vers /signin  ");
       this.router.navigate(['/signin']);
       // this.authenticatedSuject.next(false);
      return;
    }
    console.log("Utilisateur authentifié headerr.toggleShowLogging(), et va etre deconnecté la ligne suiviante ");
    this.logout();
    console.log("Utilisateur déconnecté dasn headerr.toggleShowLogging() ! ");
  }

  loginForm(email: string, password: string): void {
    this.http.post<AppUser>(`${this.API_URL}/auth/login`, { email, password }, { withCredentials: true }).subscribe({
      next: response => {
        this.userSubject.next(response);
        this.isAuthenticated.next(true);
        console.log("Login success", response);
        this.router.navigate(['/']);
        //console.log("user ", response);
        // if(this.isAuthenticated.value && this.user?.userRole==="USER") {
        //   this.router.navigate(['/user']);
        // }
        // if(this.isAuthenticated.value && this.user?.userRole==="JOBBER") {
        //   this.router.navigate(['/jobber']);
        // }
        // if(this.isAuthenticated.value && this.user?.userRole==="PROVIDER") {
        //   this.router.navigate(['/provider']);
        // }

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

    return this.http.post(`${this.API_URL}/auth/registration`, { email, password}, { withCredentials: true });

  }

  registrationResponse: RegistrationResponse = {
    success: false,
    message:"",
    fullName:"",
    userRole:""
  }

  private registrationResponseObs= new BehaviorSubject<RegistrationResponse>(this.registrationResponse);
   private registrationResponse$ = this.registrationResponseObs.asObservable();

  postRegistrationForm(formregister: FormRegister ) {
     this.http.post<RegistrationResponse>(`${this.API_URL}/auth/register`,formregister, { withCredentials: true }).subscribe(
      {
        next: (form) => {
          //this.emailAlreadyUsed = false;
          this.registrationResponse=form;
           this.registrationResponseObs.next(form);

           this.router.navigate(['/successregestration']);

          console.log("form registration ", form);
        },
        error: error => {
          if (error.status === 409 ||  (typeof error.error === 'string' && error.error.includes('Email is already taken'))) {
            this.validationErrors = { email: error.error };
           // this.validationErrors = error
            // console.log(error);
            this.validationErrorsSubject.next(this.validationErrors);
             console.log("test ", this.validationErrors['email'] );
            //this.emailAlreadyUsed = true;
          }


        }
      });
    //console.log('Form submitted:', this.formLogin);;
  }

getvalidationErrorsObs():Observable<any> {
    return this.validationErrorsObs;
}

  getRegistrationResponse(): Observable<RegistrationResponse> {
    return this.registrationResponse$;
  }


  public fetchAuth0(){
    console.log(" this.isAuthenticated nlogin  ", this.isAuthenticated);
    window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';
    console.log("Utilisateur connecté ! ");
   // this.getUserInfo();
  }


  public upDateisAUthenticated( isAuth: boolean): void {
    this.isAuthenticated.next(isAuth);
  }


  public convertArrayString(tests:string [] | string): string[]  {
    console.log("test string",tests)
    if(!Array.isArray(tests)){
     tests = tests ? [tests]:[];

    }

    return tests;
  }

  public toggleIsAuthenticated():void{
     //this.isAuthenticated = !this.isAuthenticated;
    this.isAuthenticated.next(!this.isAuthenticated.value);
  }

  logoutHybridApi(): void {
    this.http.post(`${this.API_URL}/hybrid-api/auth/logout-hybrid-api`, {}, { responseType: 'text' }).subscribe(() => {
      this.userSubject.next(null); // Supprime les infos utilisateur immédiatement
      setTimeout(() => {
        this.isAuthenticated.next(true);
        window.location.href = '/login'; // Redirige vers la page de login

      }, 100);
    }, error => {
      console.error('Erreur de déconnexion', error);
    });
  }





  setPassword(email: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/auth/set-password`, {
      email,
      password
    });
  }


  //
  // private tokenKey = 'auth_token';
  //
  // public setToken(token: string): void {
  //   localStorage.setItem(this.tokenKey, token);
  // }
  //
  // public getToken(): string | null {
  //   return localStorage.getItem(this.tokenKey);
  // }
  //
  // public clearToken(): void {
  //   localStorage.removeItem(this.tokenKey);
  // }
  // // Méthode pour supprimer le token (lors de la déconnexion)
  // removeToken(): void {
  //   localStorage.removeItem('jwt_token');
  //   this.userSubject.next(null);
  //   this.isAuthenticated.next(false);
  // }

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

// méthode de déconnexion correcte
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
    this.isAuthenticated.next(false);
  }

  initAuth(): void {
    const token = this.getToken();
    if (token) {
      // Tu peux ajouter une vérification ici : expiration, JWT valide, etc.
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

}
