import { Component } from '@angular/core';
import {HederAaComponent} from "../../../heder/heder.component";
import {LoginComponent} from "../../../login/login.component";


@Component({
  selector: 'app-sig-in',
  standalone: true,
  imports: [
    HederAaComponent,
    LoginComponent
  ],
  templateUrl: './sig-in.component.html',
  styleUrl: './sig-in.component.css'
})
export class SigInComponent {

}
