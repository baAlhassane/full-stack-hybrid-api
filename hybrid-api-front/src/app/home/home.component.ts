import { Component } from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";
import {LoginComponent} from "../login/login.component";
import {AuthService} from "../users/authService/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    LoginComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  color: string='red';
  b: boolean=true;
  private subscription: Subscription = new Subscription();
  private isAuthenticated: boolean=false;


  constructor(public authService: AuthService) {
  //   this.subscription= this.authService
  //     .emitSubject()
  //     .subscribe(
  //       {
  //         next: (value) => {
  //           this.isAuthenticated = value;
  //           // this.color='chartreuse';
  //
  //         },
  //         error: error => { console.log(error); },
  //       }
  //     )
  }
}
