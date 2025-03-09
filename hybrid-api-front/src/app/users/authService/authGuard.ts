import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

const authGuard=(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)=>{

  const authService=inject(AuthService);

  const authorities=next.data["authorities"];
 return !authorities || authorities.length === 0 || authService.hasAnyAuthority(authorities);
 return false;

}
