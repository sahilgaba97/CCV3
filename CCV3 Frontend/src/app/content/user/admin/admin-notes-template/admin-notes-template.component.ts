import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-notes-template',
  templateUrl: './admin-notes-template.component.html',
  styleUrls: ['./admin-notes-template.component.css']
})
export class AdminNotesTemplateComponent implements OnInit {
 
  @Input() 
  object:{
    heading:string, 
    text:string, 
    subject:string,
    dateCreated: string, 
    userFirstName: string,
    userEmail: string,
    author: string,
    authorized: boolean,
    filename: string,
    originalname: string,
  };

  @Output() viewButton=new EventEmitter<{
    filename: string, 
    originalname: string, 
    heading:string,
    text:string
  }>();
  @Output() authButton=new EventEmitter<{
    filename: string,
    originalname:string,
    dateCreated:string,
    userEmail:string
  }>();
  @Output() rejectButton=new EventEmitter<{
    filename: string,
    originalname:string,
    dateCreated:string,
    userEmail:string
  }>();

  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
  }


  viewPressed()
  {
    this.viewButton.emit({
      filename: this.object.filename,
      originalname: this.object.originalname,
      heading: this.object.heading,
      text: this.object.text
    })
  }
  authPressed()
  {
    this.authButton.emit({
      filename: this.object.filename,
      originalname: this.object.originalname,
      dateCreated: this.object.dateCreated,
      userEmail: this.object.userEmail
    })
  }
  rejectPressed()
  {
    this.rejectButton.emit({
      filename: this.object.filename,
      originalname: this.object.originalname,
      dateCreated: this.object.dateCreated,
      userEmail: this.object.userEmail
    })
  }
}
