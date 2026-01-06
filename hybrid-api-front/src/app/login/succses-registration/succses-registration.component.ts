import {Component, inject, OnInit} from '@angular/core';
import {RegistrationComponent} from "../registration/registration.component";
import {AuthService} from "../../users/authService/auth.service";
import {RegistrationResponse} from "../../users/models/users";
import {NgIf} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-succses-registration',
  imports: [
    NgIf,
    RouterModule
  ],
  templateUrl: './succses-registration.component.html',
  standalone: true,
  styleUrl: './succses-registration.component.css'
})
export class SuccsesRegistrationComponent implements OnInit {

  registrationResponse: RegistrationResponse = {
    success: false,
    message:"",
    fullName:"",
    userRole:""
  }

authService: AuthService=inject(AuthService);

  ngOnInit() {
this.authService.getRegistrationResponse().subscribe({
  next: (registrationResponse: RegistrationResponse) => {
    this.registrationResponse = registrationResponse;
  }
});

  }


}
