import {Component, inject} from '@angular/core';
import {LoginComponent} from "../../login/login.component";
import {NgIf} from "@angular/common";
import {AuthService} from "../authService/auth.service";
import {Subscription} from "rxjs";
import {User} from "../models/users";

@Component({
  selector: 'app-user',
  standalone: true,
    imports: [
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
  user: User | undefined | null=null;

  ngOnInit(): void {

    this.authService.emitUserSubject().subscribe({
        next: (user)=>{
          this.user = user;
          console.log("user in login ", user);
        }

      }
    )

    this.authService.emitisAutSubject().subscribe({
      next: (value: boolean) => {this.isAuthenticated = value;}
    });
  }

}
