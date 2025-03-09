import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FaIconComponent, FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {faUber} from "@fortawesome/free-brands-svg-icons";
import {fontAwesomeIcons} from "../../../font-awesome";

// import {
//   faArrowUp, faBookReader,
//   faBriefcase, faBullhorn, faChartLine,
//   faClipboardCheck, faDonate, faFire, faHandHoldingHeart,
//   faHandshake, faHeart, faLightbulb, faNewspaper, faPeopleCarry, faRss,
//   faTasks, faUser,
//   faUserAlt,
//   faUserTie,
//   faBars,
// } from "@fortawesome/free-solid-svg-icons";
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
    this.subscription= this.authService
      .emitSubject()
      .subscribe(
        {
          next: (value) => {
            this.isAuthenticated = value;
            // this.color='chartreuse';
            console.log("Utilisateur connecte dans header.ngOnInit() ! ", this.isAuthenticated );
            console.log("------------------------------");
            },
          error: error => { console.log(error); },
        }
      )


    this.authService.emitUserSubject()
      .subscribe(
        {
          next: (value) => { this.user = value; },
          error: error => { console.log(error); },
        }
      )
  }



  logoutHybridApi(): void {
    this.authService.logoutHybridApi();
  }

  // toggleShowLogging(){
  //   if( (!this.isAuthenticated && this.user==null) || (this.isAuthenticated && this.user === null)){
  //     // this.isAuthenticated = false;
  //     //  this.authService.upDateisAUthenticated(this.isAuthenticated);
  //     //  this.authService.toggleIsAuthenticated();
  //     console.log(" isAuthenticated if 1 : ", this.isAuthenticated)
  //     this.router.navigate(['/signin']);
  //   }
  //   else {
  //     console.log(" isAuthenticated if 2 : ", this.isAuthenticated );
  //     //this.router.navigate(['/signout']);
  //     this.isAuthenticated = true;
  //     this.authService.upDateisAUthenticated(this.isAuthenticated);
  //     this.authService.toggleIsAuthenticated();
  //     //window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';
  //    // this.router.navigate(['/signout']);
  //     this.authService.logout();
  //   }
 // }


  toggleShowLogging() {
    if (!this.isAuthenticated || this.user == null) {
      console.log("Utilisateur non authentifié dans headerr.toggleShowLogging(), redirection vers /signin  ");
      this.router.navigate(['/signin']);
      return;
    }

    console.log("Utilisateur authentifié headerr.toggleShowLogging(), et va etre deconnecté la ligne suiviante ");
    this.authService.logout();
    console.log("Utilisateur déconnecté dasn headerr.toggleShowLogging() ! ");
  }



  getColor() {
    // console.log(this.isAuthenticated, this.color);
    return this.isAuthenticated ? 'red': 'chartreuse' ;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Évite les fuites de mémoire
  }


  logout(): void {
      //this.router.navigate(['/signout']);
    if(this.isAuthenticated && this.user!=null){
      this.isAuthenticated = true;
      this.authService.upDateisAUthenticated(this.isAuthenticated);
      this.authService.toggleIsAuthenticated();
      //window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';
      // this.router.navigate(['/signout']);
      this.authService.logout();
    }

  }
}
