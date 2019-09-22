import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-admin-pdf-view',
  templateUrl: './admin-pdf-view.component.html',
  styleUrls: ['./admin-pdf-view.component.css']
})
export class AdminPdfViewComponent implements OnInit {

  @Input() pdfSrc:string="Blank PDF.pdf"
  // pdfLink:string="https://coconutc-docs.s3.ap-south-1.amazonaws.com/"+this.pdfSrc
  showLoader:boolean=true;
  
  constructor() { }

  ngOnInit() {
  }

  callBackFn(data)
  {
    // console.log(data)
    // console.log("Render complete")
    this.showLoader=false
  }
  
}
