import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ece-year2',
  templateUrl: './ece-year2.component.html',
  styleUrls: ['./ece-year2.component.css']
})
export class EceYear2Component implements OnInit {
  prefixLink:string="/BTech/ece";
  sem3subjects:{name:string, rlink:string}[]=[
    {name:"Applied Mathematics 3", rlink: this.prefixLink+"/appliedMathematics3"},
    {name:"Switching Theory Logic Design", rlink: this.prefixLink+"/switchingTheoryLogicDesign"},
    {name:"Data Structures", rlink: this.prefixLink+"/dataStructures"},
    {name:"Analog Electronics 1", rlink: this.prefixLink+"/analogElectronics1"},
    {name:"Electronic Instruments Measurements", rlink: this.prefixLink+"/electronicInstrumentsMeasurements"},
    {name:"Signals Systems", rlink: this.prefixLink+"/signalsSystems"},
  ];
  
  sem4subjects:{name:string, rlink:string}[]=[
    {name:"Applied Mathematics 4", rlink: this.prefixLink+"/appliedMathematics4"},
    {name:"Analog Electronics 2", rlink: this.prefixLink+"/analogElectronics2"},
    {name:"Communication Systems", rlink: this.prefixLink+"/communicationSystems"},
    {name:"Computer Organization Architecture", rlink: this.prefixLink+"/computerOrganizationArchitecture"},
    {name:"Network Analysis & Synthesis", rlink: this.prefixLink+"/networkAnalysisSynthesis"},
    {name:"Electromagnetic Field Theory", rlink: this.prefixLink+"/electromagneticFieldTheory"},
  ];
  constructor() { }

  ngOnInit() {
  }

}
