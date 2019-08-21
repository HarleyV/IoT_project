import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-power-panel',
  templateUrl: './power-panel.component.html',
  styleUrls: ['./power-panel.component.css']
})
export class PowerPanelComponent implements OnInit {

  private name: string;
  private topic: string;
  private style: any;
  private icon: any;
  private onClick: Function;

  constructor(private type: string, private socket: SocketService) { 
    if(type === "power"){
      this.icon = "";
      this.onClick.prototype = () => {
        console.log("OnClick Called")
      };

      this.style = "power";
    } else if (type == "temp_sensor") {

    }
  }

  ngOnInit() {
    
  }

  switchPower(){
    let message: string;
    (true)? message = "on": message = "off";

    this.socket.publishAsMQTT(this.topic, message);
  }

  activate(){
    let message = "activate";
    this.socket.publishAsMQTT(this.topic, "activate")
  }

  customMessage(message: string) {
    this.socket.publishAsMQTT(this.topic, message);
  }

  recieveData(){
    
  }


}
