import {Component, model, OnDestroy, OnInit} from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";
import {LoginComponent} from "../login/login.component";
import {AuthService} from "../users/authService/auth.service";
import {Subscription} from "rxjs";
import {AppUser} from "../users/models/users";
import {DateTime} from "luxon";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  imports: [
    CalendarModule,
    FormsModule

  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  color: string='red';
  b: boolean=true;
  user: AppUser | null | undefined;
  private subscription: Subscription = new Subscription();
  isAuthenticated: boolean=false;


  constructor(public authService: AuthService) {


  //   this.subscription= this.authService
  //     .emitSubject()
  //     .subscribe(
  //       {
  //         next: (value) => {
  //           this.isAuthenticated = value;
  //           // this.color='chartreuse';
  //
  //         },
  //         error: error => { console.log(error); },
  //       }
  //     )
  }

  ngOnInit() {
    this.authService.emitUserSubject().subscribe({
      next: user => {
        this.user=user;
        //console.log("this.user in form_login ::: ",this.user);
      }
    })
    this.authService.emitisAutSubject().subscribe({
      next: b => {
        this.isAuthenticated=b;
      }


    })

  }

  ngOnDestroy() {}



  date = model<DateTime>();
  heureDeDebut = model<DateTime>();
  heureDeFin = model<DateTime>();

  tarifPerHours = model<number>();
  totalPrice = model<number>();
  convertToLuxon(event: Date | null): DateTime {
    if (!event) {
      // Si la date est effacée, on peut renvoyer la date actuelle
      // ou gérer le null selon tes besoins.
     // this.stepValidityChange.emit(true)
      return DateTime.now();
    }

    // La méthode magique de Luxon
    return DateTime.fromJSDate(event);
  }

}



