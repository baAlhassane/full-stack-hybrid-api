import {Component, inject, OnInit, signal} from '@angular/core';
import {AppUser, User} from "../models/users";
import {AuthService} from "../authService/auth.service";
import {NgIf} from "@angular/common";
import {UserDashboardComponent} from "../../user-dashboard/user-dashboard/user-dashboard.component";
import {Job} from "../../jobs/job.model";
import {JobDescriptionComponent} from "../../jobs/createJobSteps/job-description/job-description.component";

@Component({
  selector: 'app-provider',
  imports: [
    NgIf,
    UserDashboardComponent,
    JobDescriptionComponent
  ],
  templateUrl: './provider.component.html',
  standalone: true,
  styleUrl: './provider.component.css'
})
export class ProviderComponent implements OnInit {


user: AppUser | null | undefined;
  private authService: AuthService=inject(AuthService);
  isAuthenticated: boolean=false;
  userTypeDashboard = signal<string>("");
  publishJobList: Job[] = [];
 title=signal("title");
  description= signal("description");
    ngOnInit(): void {
      this.authService.emitUserSubject().subscribe({
        next: user => {
          this.user=user;
          this.userTypeDashboard.set(<string>user?.userType);
          console.log("this.user ::: ",this.user);
        }
      });

      this.authService.emitisAutSubject().subscribe({
        next: (value: boolean) => {this.isAuthenticated = value;}
      });

    }



}
