import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenericService } from 'src/app/generic.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subject-component',
  templateUrl: './subject-component.component.html',
  styleUrls: ['./subject-component.component.css']
})
export class SubjectComponentComponent implements OnInit,OnDestroy {

  haveInternetConnection:boolean=true;
  loaderShow:boolean=true;
  docsArray=[];
  page=1;
  totalPages:number;
  totalDocs:number;

  

  subjectName=this.route.snapshot.data['subjectName']
  endpointEnd=this.route.snapshot.data['endpointEnd']
   
  notesArray=this.genericService.getSubjectDocs(this.endpointEnd,this.page)
  notesArraySubscription:Subscription=this.notesArray.subscribe(
    (response)=>{
      // console.log(response.docsArray)
      this.loaderShow=false;
      this.docsArray=response.docsArray;
      this.totalPages=response.totalPages;
      this.totalDocs=response.totalDocs;
    },
    (errors)=>{
      this.haveInternetConnection=false;
      console.log("Showing errors:--")
      console.log(errors)
    }
  )

  constructor(
    private genericService: GenericService,
    private route: ActivatedRoute
    ){}

    ngOnInit() {
      // console.log(this.route.snapshot.data['message']) 
  }   
  ngOnDestroy(){
    this.notesArraySubscription.unsubscribe();
  }
  goToPage(p)
  {
    this.loaderShow=true;
    this.page=p;
    this.notesArray=this.genericService.getSubjectDocs(this.endpointEnd,this.page)
    this.notesArraySubscription=this.notesArray.subscribe(
      (response)=>{
        this.loaderShow=false;
        this.docsArray=response.docsArray;
      },
      (errors)=>{
        this.haveInternetConnection=false;
        console.log(errors)
      }
    )
  }

  previousPage()
  {
    this.loaderShow=true;
    this.page=--this.page;
    this.notesArray=this.genericService.getSubjectDocs(this.endpointEnd,this.page)
    this.notesArraySubscription=this.notesArray.subscribe(
      (response)=>{
        this.loaderShow=false;
        this.docsArray=response.docsArray;
      },
      (errors)=>{
        this.haveInternetConnection=false;
        console.log(errors)
      }
    )
  }

  nextPage()
  {
    this.loaderShow=true;
    this.page=++this.page;
    this.notesArray=this.genericService.getSubjectDocs(this.endpointEnd,this.page)
    this.notesArraySubscription=this.notesArray.subscribe(
      (response)=>{
        this.loaderShow=false;
        this.docsArray=response.docsArray;
      },
      (errors)=>{
        this.haveInternetConnection=false;
        console.log(errors)
      }
    )
  }
}

