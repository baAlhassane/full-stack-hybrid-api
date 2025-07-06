import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../authService/auth.service";
import {User} from "../models/users";
import {NgIf} from "@angular/common";
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-jobber',
  standalone: true,
  imports: [
    NgIf, LoginComponent
  ],
  templateUrl: './jobber.component.html',
  styleUrl: './jobber.component.css'
})
export class JobberComponent implements OnInit {

  private authService: AuthService=inject(AuthService);
  isAuthenticated: boolean=false;
  user: User | null | undefined;
  ngOnInit(): void {
    this.authService.emitUserSubject().subscribe({
      next: user => {
        this.user = user;
        console.log("this.user ::: ", this.user);
      }
    });

    this.authService.emitisAutSubject().subscribe({
      next: (value: boolean) => {this.isAuthenticated = value;}
    });
  }

  }
