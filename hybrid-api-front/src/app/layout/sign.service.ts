import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {AuthService} from "../users/authService/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SignService {
  private authenticatedSuject : Subject<boolean>=new Subject();
  authenticatedSuject$=this.authenticatedSuject.asObservable();
  private isAuthenticated: boolean=false;

  constructor( authService: AuthService ) { }



  public emitSubject(): Observable<boolean> {

    return this.authenticatedSuject$;

  }

  public emitIsAuthenticated():void{
    this.isAuthenticated = !this.isAuthenticated;
    this.authenticatedSuject.next(this.isAuthenticated);
  }

}
