import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cse-year1',
  templateUrl: './cse-year1.component.html',
  styleUrls: ['./cse-year1.component.css']
})
export class CseYear1Component implements OnInit {
  prefixLink:string="/BTech/cse";
  sem1subjects:{name:string, rlink:string}[]=[
    {name:"Applied Mathematics 1", rlink: this.prefixLink+"/appliedMathematics1"},
    {name:"Manufacturing Processes", rlink: this.prefixLink+"/manufacturingProcesses"},
    {name:"Applied Chemistry", rlink: this.prefixLink+"/appliedChemistry"},
    {name:"Applied Physics 1", rlink: this.prefixLink+"/appliedPhysics1"},
    {name:"Electrical Technology", rlink: this.prefixLink+"/electricalTechnology"},
    {name:"Fundamentals Of Computing", rlink: this.prefixLink+"/fundamentalsOfComputing"},
  ];
  
  sem2subjects:{name:string, rlink:string}[]=[
    {name:"Applied Mathematics 2", rlink: this.prefixLink+"/appliedMathematics2"},
    {name:"Electronic Devices", rlink: this.prefixLink+"/electronicDevices"},
    {name:"Engineering Mechanics", rlink: this.prefixLink+"/engineeringMechanics"},
    {name:"Applied Physics 2", rlink: this.prefixLink+"/appliedPhysics2"},
    {name:"Introduction to programming", rlink: this.prefixLink+"/introductionToProgramming"},
  ];
  constructor() { }

  ngOnInit() {
  }

}
