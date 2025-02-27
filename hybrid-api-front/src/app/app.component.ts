import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent  } from "././layout/header/header.component";
import { HomeComponent } from './home/home.component';
import  {FooterComponent } from "././layout/footer/footer.component"
import {ButtonModule} from "primeng/button";
import {LoginComponent} from "./login/login.component";




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,
    ButtonModule, HomeComponent, LoginComponent, RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-projet';


}
