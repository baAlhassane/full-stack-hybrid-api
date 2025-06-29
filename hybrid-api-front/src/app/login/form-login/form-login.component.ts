import {booleanAttribute, Component, inject, Input, input, signal, WritableSignal} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {WrappedNodeExpr} from "@angular/compiler";
import {AuthService} from "../../users/authService/auth.service";
import {FormLogin, User} from "../../users/models/users";

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    NgIf,
    PaginatorModule
  ],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {

  firstname:WritableSignal<string>=signal<string>("");
  email:WritableSignal<string>=signal<string>("");
  password:WritableSignal<string>=signal<string>("");

   formLogin: FormLogin={
    //firstname:"",
    //lastname:"",
    password:"",
    email:"",
  }
  //formLogin:WritableSignal<User>=signal<FormLogin>(this.formLogin);

  //@Input()
  isAuthenticated=input.required<boolean>();
  authService:  AuthService=inject(AuthService);
  isSubmitting = false;
  isAuth= false;
  user: User | undefined | null = null;
  validationErrors: { [key: string]: string } = {};

  onSubmitForm() {
    if (this.isSubmitting) return; // protection contre double clic
    this.isSubmitting = true;

    const emailValue = this.email();
    const passwordValue = this.password();

    this.authService.loginForm(emailValue, passwordValue);
    this.authService.emitUserSubject().subscribe({
      next: user => {
        this.user=user;
        console.log("this.user ::: ",this.user);
      }
    })
    this.authService.getvalidationErrorsObs().subscribe(
      {
        next: errors => { this.validationErrors = errors; },
      }
    )


    this.isSubmitting = false;
      }


}
