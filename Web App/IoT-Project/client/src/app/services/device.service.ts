import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Device } from '../models/device';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private devices: Array<Device> = new Array<Device>();

  constructor(private firestore: AngularFirestore, private auth: AuthService, private userServcie: UserService) { 
    if(auth.getAuthState()){
      this.getUserDevices();

    }
  }

  getUserDevices(){
    //let currentUser: AngularFirestoreDocument<User>;
    this.firestore.collection('users').doc(this.auth.getUID()).ref.get().then((doc) => {
      if(doc.exists){
        let deviceList : Array<string> = doc.data().devices;
        deviceList.forEach((deviceID) => {
          this.firestore.collection('devices').doc(deviceID).ref.get().then((doc) => {
            let newDevice = new Device(doc.data().clientID, doc.data().name, doc.data().functions, doc.data().topics, doc.data().users);
            this.devices.push(newDevice); 
            console.log(newDevice);          
          });
        });

        console.log("Document Data", this.devices);

      } else {
        console.log("Document does not exist");
      }
    });
  }

  getDeviceList(){
    return this.devices;
  }

}
