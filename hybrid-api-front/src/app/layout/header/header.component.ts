import {Component, inject, OnInit} from '@angular/core';
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
import {RouterLink} from "@angular/router";

import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {




  faIconLibrary=inject(FaIconLibrary);
  private authService= inject(AuthService);

  private initFontAwesome(){
    this.faIconLibrary.addIcons(...fontAwesomeIcons)
  }


  ngOnInit() {
this.initFontAwesome();

  }

  logoutHybridApi(): void {
    this.authService.logoutHybridApi();
  }

  // protected readonly faUser = faUser;
  // protected readonly faUserAlt = faUserAlt;
  // protected readonly faHandshake = faHandshake;
}
