import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FaIconComponent, FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {faUber} from "@fortawesome/free-brands-svg-icons";
import {fontAwesomeIcons} from "../../../font-awesome";


import {Router, RouterLink} from "@angular/router";

import {AuthService} from "../../users/authService/auth.service";
import {CommonModule, NgIf, NgStyle} from "@angular/common";
import {Subscription} from "rxjs";

import {SignService} from "../sign.service";
import {Button} from "primeng/button";
import {DataRowOutlet} from "@angular/cdk/table";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    NgIf,
    NgStyle,
    Button,
    DataRowOutlet,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  user:any;
  userSubscription=new Subscription();

  faIconLibrary=inject(FaIconLibrary);
  private authService= inject(AuthService);
  router=inject(Router);
  isAuthenticated: boolean=false;
  private subscription: Subscription= new Subscription();
  private signService=inject(SignService);
  color:string="";

  private initFontAwesome(){
    this.faIconLibrary.addIcons(...fontAwesomeIcons)
  }


  ngOnInit() {
this.initFontAwesome();
   // this.authService.getUserInfo(); // Récupérer l'info utilisateur au chargement
   //  this.authService.emitUserSubject()
   //    .subscribe(
   //      {
   //        next: (value) => {
   //          this.user = value;
   //          console.log("this.user in header  : ",this.user);
   //        },
   //        error: error => { console.log(error); },
   //      }
   //    );
    // this.authService.authenticatedSuject$.subscribe(isAuth => {
    //   console.log(" in Header  - isAuthenticated:", isAuth);
    //   this.isAuthenticated = isAuth;
    // });

    this.authService.emitisAutSubject()
      .subscribe({
        next: (value) => {
          this.isAuthenticated = value;
          console.log("this.isAuthenticated in headerrr : ",this.isAuthenticated);

        }
      });

  }



  logoutHybridApi(): void {
    this.authService.logoutHybridApi();
  }



  toggleShowLogging() {
    this.authService.loging();

  }



  getColor() {
    // console.log(this.isAuthenticated, this.color);
    return this.isAuthenticated ? 'red': 'chartreuse' ;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Évite les fuites de mémoire
  }



}
