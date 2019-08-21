import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  canActivate(): boolean {
    if(this.auth.getAuthState()){
      console.log("Accessesing Page")
      return true;
    } else {
      console.log("Access denied");
      this.router.navigate(['/']);
      return false;
    }
  }
  
}
