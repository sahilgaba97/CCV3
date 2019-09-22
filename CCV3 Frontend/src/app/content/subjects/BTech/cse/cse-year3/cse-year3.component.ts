import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cse-year3',
  templateUrl: './cse-year3.component.html',
  styleUrls: ['./cse-year3.component.css']
})
export class CseYear3Component implements OnInit {
  prefixLink:string="/BTech/cse";
  sem5subjects:{name:string, rlink:string}[]=[
    {name:"Digital Communication", rlink: this.prefixLink+"/digitalCommunication"},
    {name:"Algorithm Design & Analysis", rlink: this.prefixLink+"/algorithmDesignAndAnalysis"},
    {name:"Software Engineering", rlink: this.prefixLink+"/softwareEngineering"},
    {name:"Java Programming", rlink: this.prefixLink+"/javaProgramming"},
  ];
  
  
sem6subjects:{name:string, rlink:string}[]=[
  {name:"microprocessors & Microcontrollers", rlink: this.prefixLink+"/microprocessorsMicrocontrollers"},
  {name:"compiler Design", rlink: this.prefixLink+"/compilerDesign"},
  {name:"Operating System", rlink: this.prefixLink+"/operatingSystem"},
  {name:"Computer Networks", rlink: this.prefixLink+"/computerNetworks"},
  {name:"Web Technology", rlink: this.prefixLink+"/webTechnology"},
  {name:"Artificial Intelligence", rlink: this.prefixLink+"/artificialIntelligence"},
];


  constructor() { }

  ngOnInit() {
  }

}
