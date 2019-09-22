import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cse-year4',
  templateUrl: './cse-year4.component.html',
  styleUrls: ['./cse-year4.component.css']
})
export class CseYear4Component implements OnInit {
  prefixLink:string="/BTech/cse";
  sem7subjects:{name:string, rlink:string}[]=[
    {name:"Information Security", rlink: this.prefixLink+"/informationSecurity"},
    {name:"Software Testing & Quality assurance", rlink: this.prefixLink+"/softwareTesting"},
    {name:"Wireless Communication", rlink: this.prefixLink+"/wirelessCommunication"},
    {name:"Control Systems", rlink: this.prefixLink+"/controlSystems"},
    {name:"Embedded Systems", rlink: this.prefixLink+"/embeddedSystems"},
  ];
sem8subjects:{name:string, rlink:string}[]=[
    {name:"Information Theory Coding", rlink: this.prefixLink+"/informationTheoryCoding"},
    {name:"Machine Learning", rlink: this.prefixLink+"/machineLearning"},
    {name:"Mobile Computing", rlink: this.prefixLink+"/mobileComputing"},
    {name:"Adhoc & Sensor Networks", rlink: this.prefixLink+"/adhocSensorNetworks"},
  ];
  constructor() { }

  ngOnInit() {
  }

}
