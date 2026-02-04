
import {Component, effect, inject, model, OnDestroy, OnInit, signal} from '@angular/core';
import {AppUser, NotificationRegister, User} from "../../users/models/users";
import {AuthService} from "../../users/authService/auth.service";
import {Subscription} from "rxjs";
import {NotificationService} from "../../websocket/notification.service";
import {RouterLink} from "@angular/router";
import {AvatarComponent} from "../../users/avatar/avatar.component";
import {AvatarPictureDTO, JobPictureDTO} from "../../jobs/job.model";
import {SkeletonModule} from "primeng/skeleton";
import {FaIconComponent, FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faCircleExclamation, faEnvelope} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    //AvatarComponent,
    SkeletonModule,
    FaIconComponent,
    AvatarComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})


export class UserProfileComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  user = signal<AppUser | null>(null);
  private subscription = new Subscription();

  // Cette méthode DOIT exister exactement avec ce nom
  ngOnInit(): void {
    this.subscription.add(
      this.authService.emitUserSubject().subscribe({
        next: (user) => {
          if (user) {
            this.updateLocalAvatar(user);
          }
        }
      })
    );
  }

  private updateLocalAvatar(user: AppUser) {
    const userWithPhoto = { ...user };

    // Maintenant, ce "if" sera VRAI car userPicture.file existera !
    if (userWithPhoto.userPicture?.file) {
      userWithPhoto.userPicture.urlDisplay =
        `data:${userWithPhoto.userPicture.fileContentType};base64,${userWithPhoto.userPicture.file}`;
    }

    this.user.set(userWithPhoto);
  }

  // private updateLocalAvatar(user: AppUser) {
  //   // On crée une copie profonde pour déclencher la réactivité
  //   const userWithPhoto = JSON.parse(JSON.stringify(user));
  //
  //   // Vérification : Si on a les données binaires (file)
  //   if (userWithPhoto.userPicture && userWithPhoto.userPicture.file) {
  //     console.log("Données binaires détectées, conversion en Base64...");
  //
  //     // On construit la chaîne Data URL
  //     userWithPhoto.userPicture.urlDisplay =
  //       `data:${userWithPhoto.userPicture.fileContentType};base64,${userWithPhoto.userPicture.file}`;
  //   }
  //
  //   // Mise à jour du signal
  //   this.user.set(userWithPhoto);
  //
  //   // Debug : vérifie dans la console si urlDisplay commence bien par "data:image"
  //   console.log("User mis à jour :", this.user());
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

   protected readonly faEnvelope = faEnvelope;
  protected readonly faCircleExclamation = faCircleExclamation;
}




// export class UserProfileComponent implements OnInit,  OnDestroy {
//
//   authService=inject(AuthService);
//   isAuthenticated: boolean=false;
//   private subscription: Subscription= new Subscription();
//  //user: AppUser | null=null;
//   user = signal<AppUser | null>(null);
//   //user = model<AppUser | null>();
//
//
//   avatarPicture = signal<AvatarPictureDTO | null>(null);
//   notification: NotificationRegister | undefined;
//   notificationService: NotificationService=inject(NotificationService);
//
//   constructor(library: FaIconLibrary) {
//     library.addIcons(faEnvelope, );
//   }
//
//
//   private updateLocalAvatar(user: AppUser) {
//     const userWithPhoto = { ...user };
//
//     // On vérifie si on a les données binaires (le champ 'file')
//     if (userWithPhoto.userPicture?.file) {
//       // Construction de la source de l'image à partir du Base64
//       userWithPhoto.userPicture = {
//         ...userWithPhoto.userPicture,
//         urlDisplay: `data:${userWithPhoto.userPicture.fileContentType};base64,${userWithPhoto.userPicture.file}`
//       };
//     } else if (userWithPhoto.userPicture?.url) {
//       // Si pas de file, on utilise l'URL, mais on sait qu'elle renvoie 204
//       // On pourrait ici décider de laisser urlDisplay à null pour afficher l'icône faUser
//       userWithPhoto.userPicture.urlDisplay = userWithPhoto.userPicture.url;
//     }
//
//     this.user.set(userWithPhoto);
//   }
//
//
//
//   ngOnDestroy(): void {
//     this.subscription.unsubscribe();
//   }
//
//   protected readonly faEnvelope = faEnvelope;
//   protected readonly faCircleExclamation = faCircleExclamation;
// }
