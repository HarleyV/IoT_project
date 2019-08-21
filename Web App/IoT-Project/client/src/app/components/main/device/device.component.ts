import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { Device } from 'src/app/models/device';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  constructor(private deviceService: DeviceService) { }

  private deviceList: Array<Device>;
  
  ngOnInit() {
    this.deviceList = this.deviceService.getDeviceList();
  }

  onClick(){
    //this.deviceService.getUserDevices();
  }

  

}
