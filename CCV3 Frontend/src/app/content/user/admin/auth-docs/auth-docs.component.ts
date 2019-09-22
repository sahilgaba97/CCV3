import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-auth-docs',
  templateUrl: './auth-docs.component.html',
  styleUrls: ['./auth-docs.component.css']
})
export class AuthDocsComponent implements OnInit,OnDestroy {
  haveInternetConnection:boolean=true;
  loaderShow:boolean=true;
  docsArray=[];
  page=1;
  totalPages:number;
  totalDocs:number;
  pdfDisplay:string="Blank PDF.pdf"
  originalname:string;
  heading:string;
  text:string;
  // /assets/pdfs/imageDoc.pdf

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute) { }

    notesArray=this.authService.getUnauthDocs(this.page)
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

  ngOnInit() {
  }
  ngOnDestroy(){
    this.notesArraySubscription.unsubscribe();
  }

  viewPressed(data:{ 
    filename: string, 
    originalname: string, 
    heading:string,
    text:string
  })
  {
    this.pdfDisplay=data.filename;
    this.originalname=data.originalname;
    this.heading=data.heading;
    this.text=data.text;
    // console.log("View pressed: ")
    // console.log(this.pdfDisplay)
  }

  authPressed(data:{ 
    filename: string,
    originalname:string,
    dateCreated:string,
    userEmail:string
  })
  {
    this.authService.authorizeDoc(data)
    .subscribe(
      data=>{
        // console.log("Data: ")
        // console.log(data)
        if(data.success)
        {
            this.notesArray=this.authService.getUnauthDocs(this.page)
            this.notesArraySubscription=this.notesArray.subscribe(
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
        }
      },
      err=>{
        console.log("Error: ")
        console.log(err)
      }
    )
  }

  
  rejectPressed(data:{ 
    filename: string,
    originalname:string,
    dateCreated:string,
    userEmail:string
  })
  {
    this.authService.rejectDoc(data)
    .subscribe(
      data=>{
        // console.log("Data: ")
        // console.log(data)
        if(data.success)
        {
            this.notesArray=this.authService.getUnauthDocs(this.page)
            this.notesArraySubscription=this.notesArray.subscribe(
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
        }
      },
      err=>{
        console.log("Error: ")
        console.log(err)
      }
    )
  }

  goToPage(p)
  {
    this.loaderShow=true;
    this.page=p;
    this.notesArray=this.authService.getUnauthDocs(this.page)
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
    this.notesArray=this.authService.getUnauthDocs(this.page)
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
    this.notesArray=this.authService.getUnauthDocs(this.page)
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
