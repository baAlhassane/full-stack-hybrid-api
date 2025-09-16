import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent  } from "././layout/header/header.component";
import { HomeComponent } from './home/home.component';
import  {FooterComponent } from "././layout/footer/footer.component"
import {ButtonModule} from "primeng/button";
import {LoginComponent} from "./login/login.component";
import {AuthService} from "./users/authService/auth.service";
import {NotificationComponent} from "./notification/notification/notification.component";




@Component({
    selector: 'app-root',
  imports: [HeaderComponent, FooterComponent,
    ButtonModule, HomeComponent, RouterOutlet,
  ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  authService=inject(AuthService);
  ngOnInit(): void {
    // this.authService.getUserInfo();
    //this.authService.initAuth();
  }
  title = 'my-projet';


}
