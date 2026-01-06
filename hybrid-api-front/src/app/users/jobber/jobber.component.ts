import {Component, inject, OnInit, signal} from '@angular/core';
import {AuthService} from "../authService/auth.service";
import {AppUser, Jobber, User} from "../models/users";
import {NgIf} from "@angular/common";
import {UserDashboardComponent} from "../../user-dashboard/user-dashboard/user-dashboard.component";
import {Job} from "../../jobs/job.model";

@Component({
  selector: 'app-jobber',
  imports: [
   // NgIf,
    UserDashboardComponent
  ],
  templateUrl: './jobber.component.html',
  standalone: true,
  styleUrl: './jobber.component.css'
})
export class JobberComponent implements OnInit {

  private authService: AuthService=inject(AuthService);
  isAuthenticated: boolean=false;
  user: AppUser | null | undefined;
  jobList: Job[]=[];
  userTypeDashboard = signal<string>("");
  ngOnInit(): void {
    this.authService.emitUserSubject().subscribe({
      next: user => {
        this.user = user;
        this.userTypeDashboard.set(<string>user?.userType);
        console.log("this.user ::: ", this.user);
      }
    });

    this.authService.emitisAutSubject().subscribe({
      next: (value: boolean) => {this.isAuthenticated = value;}
    });
  }

  }
