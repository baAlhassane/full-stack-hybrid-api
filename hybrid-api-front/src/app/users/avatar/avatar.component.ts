import {Component, inject, input, model, OnInit, signal} from '@angular/core';
import {AvatarPictureDTO, JobPictureDTO} from "../../jobs/job.model";
import {AuthService} from "../authService/auth.service";
import {FaIconComponent, FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faCamera, faCircleExclamation, faUser} from "@fortawesome/free-solid-svg-icons";
import {FileUploadHandlerEvent, FileUploadModule} from "primeng/fileupload";
import {AppUser} from "../models/users";
import {AvatarModule} from "primeng/avatar";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [
    FaIconComponent,
    FileUploadModule,
    AvatarModule,
    NgIf
  ],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent  implements OnInit {


  user = model<AppUser | null>();

  // userAvatarUrl = 'http://localhost:8080/api/avatar/me'; // endpoint pour récupérer l'avatar


  //user = model.required<AppUser>();
  ngOnInit(): void {
    const currentUser = this.authService.getAuthenticatedUser();
    if (currentUser) {
      this.user.set(currentUser);


    }
  }

constructor(library: FaIconLibrary) {
    library.addIcons(faCamera, faCircleExclamation);
}


// Ton signal model requis
//   avatar = model.required<AvatarPictureDTO | null>();

  private authService: AuthService= inject(AuthService);

  onUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    // this.avatar.set({
    //   file,
    //   urlDisplay: URL.createObjectURL(file)
    // });

    this.authService.updateAvatar(file).subscribe({
      next: updatedUser => {
        this.authService.updateUser(updatedUser); // UNE SEULE FOIS
      }
    });
  }





  saveProfile() {
    const avatarPicture = this.user()?.userPicture ;
    if (!avatarPicture || !(avatarPicture.file instanceof File)) {
      return;
    }

      this.authService.updateAvatar(avatarPicture.file).subscribe({
        next: (updatedUser) => {
          console.log("Profil mis à jour", updatedUser);
          const token = this.authService.getToken();
         if(token!==null) {  updatedUser.token=token;}

          // CRUCIAL : On met à jour la "source de vérité" dans le service
          // Cela va propager le nouvel avatar à tous les composants abonnés
         // this.authService.updateUser(updatedUser);

        },
        error: (err) => console.error("Erreur update", err)
      });
    }

  private updateLocalAvatar(user: AppUser) {
    const userWithPhoto = { ...user };

    //  Si le serveur a envoyé le binaire (Base64) directement
    if (userWithPhoto.userPicture?.file) {
      userWithPhoto.userPicture.urlDisplay =
        `data:${userWithPhoto.userPicture.fileContentType};base64,${userWithPhoto.userPicture.file}`;
      this.user.set(userWithPhoto);
    }
    //  Si le binaire est absent mais qu'on a une URL (cas de ton log)
    else if (userWithPhoto.userPicture?.url) {
      this.user.set(userWithPhoto); // On affiche d'abord le reste des infos

      // On va chercher le vrai binaire via le Blob
      this.authService.getAvatarBlob().subscribe({
        next: (blob: Blob) => {
          if (blob && blob.size > 0) {
            const objectUrl = URL.createObjectURL(blob);

            // Mise à jour du signal avec l'URL Blob
            const currentUser = this.user();
            if (currentUser && currentUser.userPicture) {
              this.user.set({
                ...currentUser,
                userPicture: {
                  ...currentUser.userPicture,
                  urlDisplay: objectUrl
                }
              });
            }
          }
        },
        error: () => console.warn("L'avatar n'a pas pu être récupéré (204 ou erreur).")
      });
    } else {
      this.user.set(userWithPhoto);
    }
  }

  // C'est cette fonction que le HTML appelle à la ligne 40
  onAvatarUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    // 1. Preview local immédiat (Blob URL)
    const previewUrl = URL.createObjectURL(file);

    // On met à jour le signal pour l'affichage instantané
    const currentUser = this.user();
    if (currentUser) {
      this.user.set({
        ...currentUser,
        userPicture: {
          ...currentUser.userPicture,
          fileContentType: file.type,
          urlDisplay: previewUrl,
          url: currentUser.userPicture?.url || '' // Évite l'erreur TS
        }
      });
    }

    // 2. Upload vers le backend
    this.authService.updateAvatar(file).subscribe({
      next: (updatedUser) => {
        // Une fois l'upload fini, on met à jour le service global
        // Le mapper renverra maintenant le champ 'file' (Base64)
        this.authService.updateUser(updatedUser);
      },
      error: (err) => console.error('Erreur upload', err)
    });
  }

  // Supprime l'ancienne fonction "onUpload" si elle ne sert plus



  protected readonly faCamera = faCamera;
  protected readonly faUser = faUser;
}
