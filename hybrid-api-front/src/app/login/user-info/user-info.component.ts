import {Component, inject, input, OnInit, signal} from '@angular/core';
import {NgIf} from "@angular/common";
import {AuthService} from "../../users/authService/auth.service";

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit {
authService:AuthService=inject(AuthService);
  user: any;
  isAuthenticatedSig = signal<boolean>(false);
  isAuthenticated=input.required<boolean>();

  validationErrors: { [key: string]: string } = {};

  ngOnInit(): void {
    this.authService.emitisAutSubject().subscribe({
      next: isAuth => {this.isAuthenticatedSig.set(isAuth)}})
      this.authService.emitUserSubject().subscribe({
        next: user => {this.user=user;},
      });

  }


  logout() {
this.authService.logout();

  }
}
