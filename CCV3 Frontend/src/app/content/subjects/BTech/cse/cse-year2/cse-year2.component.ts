import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cse-year2',
  templateUrl: './cse-year2.component.html',
  styleUrls: ['./cse-year2.component.css']
})
export class CseYear2Component implements OnInit {
  prefixLink:string="/BTech/cse";
  sem3subjects:{name:string, rlink:string}[]=[
    {name:"Applied Mathematics 3", rlink: this.prefixLink+"/appliedMathematics3"},
    {name:"Switching Theory Logic Design", rlink: this.prefixLink+"/switchingTheoryLogicDesign"},
    {name:"Data Structures", rlink: this.prefixLink+"/dataStructures"},
    {name:"Foundation Of Computer Science", rlink: this.prefixLink+"/foundationOfComputerScience"},
    {name:"Computer Graphics & Multimedia", rlink: this.prefixLink+"/computerGraphicsAndMultimedia"},
    {name:"Signals Systems", rlink: this.prefixLink+"/signalsSystems"},
  ];
  
  sem4subjects:{name:string, rlink:string}[]=[
    {name:"Applied Mathematics 4", rlink: this.prefixLink+"/appliedMathematics4"},
    {name:"Computer Organization & Architecture", rlink: this.prefixLink+"/computerOrganizationArchitecture"},
    {name:"Database Management System", rlink: this.prefixLink+"/database-management-system"},
    {name:"Communication Systems", rlink: this.prefixLink+"/communicationSystems"},
    {name:"Theory Of Computation", rlink: this.prefixLink+"/theoryOfComputation"},
    {name:"Objected Oriented Programming", rlink: this.prefixLink+"/objectedOrientedProgramming"},
  ];
  constructor() { }

  ngOnInit() {
  }

}
