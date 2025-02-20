import { Component } from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";
import {HederAaComponent} from "../heder/heder.component";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    HederAaComponent,
    LoginComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  color: string='red';
  b: boolean=true;

}
