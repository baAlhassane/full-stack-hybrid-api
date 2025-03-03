import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';
  }


  loginHybridApi(){
    window.location.href = 'http://localhost:8080/oauth2/authorization/auth0';

  }
}
