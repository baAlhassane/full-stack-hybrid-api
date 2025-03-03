import { Component } from '@angular/core';
import {HederAaComponent} from "../../../heder/heder.component";
import {LoginComponent} from "../../../login/login.component";

@Component({
  selector: 'app-signout',
  standalone: true,
  imports: [
    HederAaComponent,
    LoginComponent
  ],
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.css'
})
export class SignoutComponent {

}
