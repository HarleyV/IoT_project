import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  createUser(user: User){
    var data = JSON.parse(JSON.stringify(user));
    this.firestore.collection('/users').doc(user.uid).set(data);
  }

  getUsers(){
    return this.firestore.collection('users').get();
  }
  
  getUser(uid: string){
    return this.firestore.collection<User>('users').doc(uid).get();
  }

  updateUser(user: User){
  
  }

  deleteUser(user: User){
    this.firestore.doc('users/' + user.uid).delete();
  }
}
