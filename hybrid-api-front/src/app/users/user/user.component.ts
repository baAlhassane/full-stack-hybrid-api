import { Component } from '@angular/core';
import {HederAaComponent} from "../../heder/heder.component";
import {LoginComponent} from "../../login/login.component";

@Component({
  selector: 'app-user',
  standalone: true,
    imports: [
        HederAaComponent,
        LoginComponent
    ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
