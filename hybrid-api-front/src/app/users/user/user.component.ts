import {Component, inject} from '@angular/core';
import {HederAaComponent} from "../../heder/heder.component";
import {LoginComponent} from "../../login/login.component";
import {NgIf} from "@angular/common";
import {AuthService} from "../authService/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  standalone: true,
    imports: [
        HederAaComponent,
        LoginComponent,
      NgIf
    ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  authService=inject(AuthService);
  isAuthenticated: boolean=false;
  private subscription: Subscription= new Subscription();
  user: any;

  ngOnInit(): void {
    this.authService.getUserInfo();
    this.authService.emitUserSubject().subscribe({
        next: (user)=>{
          this.user = user;
          console.log("user in login ", user);
        }

      }
    )

    this.authService.emitisAutSubject().subscribe({
      next: (value) => {this.isAuthenticated = value;}
    });
  }

}
