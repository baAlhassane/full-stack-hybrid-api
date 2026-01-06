import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {fontAwesomeIcons} from "../../../font-awesome";


import {Router, RouterLink, RouterOutlet} from "@angular/router";

import {AuthService} from "../../users/authService/auth.service";
import {CommonModule, NgIf, NgStyle} from "@angular/common";
import {Subscription} from "rxjs";

import {SignService} from "../sign.service";
import {Button} from "primeng/button";
import {DataRowOutlet} from "@angular/cdk/table";
import {AppUser, User} from "../../users/models/users";


@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    NgIf,
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  user: AppUser | undefined | null=null;
  userSubscription=new Subscription();

  faIconLibrary=inject(FaIconLibrary);
  private authService= inject(AuthService);
  router=inject(Router);
  isAuthenticated: boolean=false;
  private subscription: Subscription= new Subscription();
  private signService=inject(SignService);
  color:string="";
  userType: string | undefined = ""; // ou récupéré depuis ton AuthService


  private initFontAwesome(){
    this.faIconLibrary.addIcons(...fontAwesomeIcons)
  }

  ngOnInit() {
this.initFontAwesome();
    this.authService.emitisAutSubject()
      .subscribe({
        next: (value) => {
          this.isAuthenticated = value;
          console.log("this.isAuthenticated in headerrr : ",this.isAuthenticated);

        }
      });
    this.authService.emitUserSubject().subscribe({
      next: (value) => {
        this.user = value;
        this.userType= value?.userType;
        },
    })
  }

  logoutHybridApi(): void {
    this.authService.logoutHybridApi();
  }



  toggleShowLogging() {
    this.authService.loging();
    this.userType=" ";
  }

  getColor() {
    return this.isAuthenticated ? 'red': 'chartreuse' ;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Évite les fuites de mémoire
  }

  getLinkClass() {
    return this.isAuthenticated ? 'nav-link active' : 'nav-link';
  }


}
