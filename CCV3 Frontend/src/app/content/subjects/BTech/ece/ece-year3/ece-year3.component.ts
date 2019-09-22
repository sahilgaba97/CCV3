import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ece-year3',
  templateUrl: './ece-year3.component.html',
  styleUrls: ['./ece-year3.component.css']
})
export class EceYear3Component implements OnInit {
  prefixLink:string="/BTech/ece";
  sem5subjects:{name:string, rlink:string}[]=[
    {name:"Microprocessors & Microcontrollers", rlink: this.prefixLink+"/microprocessorsMicrocontrollers"},
    {name:"Digital System Design", rlink: this.prefixLink+"/digitalSystemDesign"},
    {name:"Digital Communication", rlink: this.prefixLink+"/digitalCommunication"},
    {name:"Control Systems", rlink: this.prefixLink+"/controlSystems"},
  ];
  
  sem6subjects:{name:string, rlink:string}[]=[
      {name:"Microwave Engineering", rlink: this.prefixLink+"/microwaveEngineering"},
      {name:"Digital Signal Processing", rlink: this.prefixLink+"/digitalSignalProcessing"},
      {name:"Data Communication & Networks", rlink: this.prefixLink+"/dataCommunicationNetworks"},
      {name:"Information Theory & Coding", rlink: this.prefixLink+"/informationTheoryCoding"},
      {name:"VLSI", rlink: this.prefixLink+"/vlsi"},
      {name:"Antenna & Wave Propogation", rlink: this.prefixLink+"/antennaWavePropogation"},
    ];
  
  
  constructor() { }

  ngOnInit() {
  }

}
