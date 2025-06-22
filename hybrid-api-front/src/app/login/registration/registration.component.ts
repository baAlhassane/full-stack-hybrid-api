import {Component, inject, input, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {AuthService} from "../../users/authService/auth.service";
import {FormLogin, FormRegister, RegistrationResponse} from "../../users/models/users";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule,
    PaginatorModule,
    InputTextModule,
    NgIf,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {

  auth: AuthService=inject(AuthService);
  authService: AuthService=inject(AuthService)  ;
  firstname:WritableSignal<string>=signal<string>("");
  lastname:WritableSignal<string>=signal<string>("");
  email:WritableSignal<string>=signal<string>("");
  password:WritableSignal<string>=signal<string>("");
  role = signal<string>("USER");
  emailAlreadyUsed = false;

  formLogin: FormRegister={
    firstname:"",
    lastname:"",
    password:"",
    email:"",
    role:""
  }
  //

  isAuthenticated=input.required<boolean>();
  validationErrors: { [key: string]: string } = {};


registrationResponse: RegistrationResponse = {
  success: false,
  message:"",
  fullName:"",
}


  ngOnInit(): void {

  }

  onRegister(form: NgForm) {
    this.formLogin = {
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      email: form.value.email, // ou form.value.firstname si tu utilises ça comme identifiant
      password: form.value.password,
      role: form.value.role
    };
     this.authService.postRegistrationForm(this.formLogin);
    this.authService.getvalidationErrorsObs().subscribe(
      {
        next: errors => { this.validationErrors = errors; },
      }
    )
  }


}
