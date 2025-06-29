import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {booleanAttribute, inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {map, take} from "rxjs";

export const authGuard=(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)=>{

  const authService=inject(AuthService);
  const router=inject(Router )

  const authorities=next.data["LAND_LORD"];
  let isAuthenticated =false;

  return authService.emitisAutSubject().pipe(
    take(1), // Prendre seulement la première valeur et compléter l'observable
    map(isAuthenticated => {
      if (!isAuthenticated) {
        console.log("❌ Utilisateur non authentifié, redirection...");
        router.navigate(["/signin"]);
        return false;
      }

      console.log("✅ Utilisateur authentifié !");
      return !authorities || authorities.length === 0 || authService.hasAnyAuthority(authorities);
    })
  );
};

