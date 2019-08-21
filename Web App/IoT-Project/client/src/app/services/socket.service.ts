import { Injectable, OnInit } from '@angular/core';
import io from "socket.io-client";
import { AuthService } from './auth.service';

const SERVER_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})

export class SocketService implements OnInit {

  private socket;

  constructor(private auth: AuthService) { 
    this.socket = io("http://localhost:3000")
  }

  ngOnInit(){
    

  }

  public ngAfterViewInit(){

  }

  public registerDevice(clientID, password){
    this.socket.emit('add_new_device', clientID, password, this.auth.getUID());
  }

  public publishAsMQTT(topic, message){
    this.socket.emit('publish_mqtt', topic, message);
  }
}
