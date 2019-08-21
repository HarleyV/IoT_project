import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})

export class AddDeviceComponent implements OnInit {

  constructor(private socketService: SocketService) { }

  ngOnInit() {
  }

  public registerDevice(clientID, password){
    this.socketService.registerDevice(clientID, password);
  }

}
