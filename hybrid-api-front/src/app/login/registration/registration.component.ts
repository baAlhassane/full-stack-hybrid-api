import {Component, input, Input, signal, WritableSignal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";

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
export class RegistrationComponent {
  firstname:WritableSignal<string>=signal<string>("");
  lastname:WritableSignal<string>=signal<string>("");
  email:WritableSignal<string>=signal<string>("");
  password:WritableSignal<string>=signal<string>("");

  isAuthenticated=input.required<boolean>();

  onRegister() {

  }


}
