import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ece-year4',
  templateUrl: './ece-year4.component.html',
  styleUrls: ['./ece-year4.component.css']
})
export class EceYear4Component implements OnInit {

  prefixLink:string="/BTech/ece";

  sem7subjects:{name:string, rlink:string}[]=[
    {name:"Embedded Systems", rlink: this.prefixLink+"/embeddedSystems"},
    {name:"Optical Communication", rlink: this.prefixLink+"/opticalCommunication"},
    {name:"Wireless Communication", rlink: this.prefixLink+"/wirelessCommunication"},
    {name:"Project Management", rlink: this.prefixLink+"/projectManagement"},
    {name:"Database Management System", rlink: this.prefixLink+"/database-management-system"},
  ];
sem8subjects:{name:string, rlink:string}[]=[
    {name:"Satellite Communication", rlink: this.prefixLink+"/satelliteCommunication"},
    {name:"Next Generation Networks", rlink: this.prefixLink+"/nextGenerationNetworks"},
    {name:"Mobile Computing", rlink: this.prefixLink+"/mobileComputing"},
    {name:"Adhoc & Sensor Networks", rlink: this.prefixLink+"/adhocSensorNetworks"},
  ];
  constructor() { }

  ngOnInit() {
  }

}
