import {Component, inject, OnInit} from '@angular/core';
import {User} from "../models/users";
import {AuthService} from "../authService/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-provider',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.css'
})
export class ProviderComponent implements OnInit {


user: User | null | undefined;
  private authService: AuthService=inject(AuthService);
  isAuthenticated: boolean=false;

    ngOnInit(): void {
      this.authService.emitUserSubject().subscribe({
        next: user => {
          this.user=user;
          console.log("this.user ::: ",this.user);
        }
      });

      this.authService.emitisAutSubject().subscribe({
        next: (value: boolean) => {this.isAuthenticated = value;}
      });

    }



}
