import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";

import { Observable, of} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FirebaseAuth } from '@angular/fire';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private newUser: User;
  private _user;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService
  ) {
    this.afAuth.authState.subscribe(user => {
      this._user = user;
      if(user){
        console.log("User logged in");
      } else {
        console.log("User logged out");
      }
    })
   }

  public getAuthState(){
    //console.log(this.authState);
    if(this._user){
      return true;
    } else {
      return false;
    }
  }

   async emailSignIn(email, password) {
     await this.afAuth.auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred);
        this._user = cred.user;
        this.newUser = new User(cred.user.uid, cred.user.email);
        this.userService.updateUser(this.newUser);

        this.router.navigate(['', cred.user.uid]);
     }).catch((error) => {
        console.log(error);
     });
   }

   async logout() {
     await this.afAuth.auth.signOut();
     this.router.navigate(['/']);
   }

   async register(email, password) {
     await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(cred => {

      let newUser = new User(cred.user.uid, cred.user.email);
      this.userService.createUser(newUser);

      this._user = cred.user;
      this.router.navigate(['', cred.user.uid]);
     }).catch((error) => {
      console.log(error);
     });
   }

   getUID(){
     return this._user.uid;
   }
}
