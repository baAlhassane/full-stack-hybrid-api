import {Component, OnDestroy, OnInit} from '@angular/core';
import {HederAaComponent} from "../../../heder/heder.component";
import {LoginComponent} from "../../../login/login.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../../users/authService/auth.service";
import {CommonModule, NgStyle} from "@angular/common";


@Component({
  selector: 'app-sig-in',
  standalone: true,
  imports: [CommonModule,
    HederAaComponent,
    LoginComponent,
    FaIconComponent,
    RouterLink,
    NgStyle
  ],
  templateUrl: './sig-in.component.html',
  styleUrl: './sig-in.component.css'
})
export class SigInComponent implements OnInit, OnDestroy {


  subscription: Subscription= new Subscription();

  isAuthenticated = false;

  constructor(private authService: AuthService) {}
  user: any | null = null;
  ngOnInit() {

  }


  toggleAddTask(){
    //console.log("toggleAddTask")
    //console.log(this.isAuthenticated);
    this.authService.toggleIsAuthenticated();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe(); // Évite les fuites de mémoire
  }



}
