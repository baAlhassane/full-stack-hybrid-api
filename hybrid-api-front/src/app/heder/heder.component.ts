import {Component, OnInit} from '@angular/core';
import {AuthService} from "../users/authService/auth.service";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-heder',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './heder.component.html',
  styleUrl: './heder.component.css'
})
export class HederAaComponent {
  constructor(private authService: AuthService) {
  }
  user: any | null = null;

  ngOnInit(): void {
    this.authService.getUserInfo(); // Récupérer l'info utilisateur au chargement
    this.authService.user$.subscribe(user => {
      this.user = user;
    });


  }
  logout(): void {
    this.authService.logout();
  }
  logoutHybridApi(): void {
    this.authService.logoutHybridApi();
  }


}

