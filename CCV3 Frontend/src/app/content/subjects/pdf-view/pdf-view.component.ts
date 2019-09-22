import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.css']
})
export class PdfViewComponent implements OnInit {
  
  // @Input() pdfSrc:string="http://localhost:3000/Thu%20Jul%2018%202019-1563467104478-Quidditch%20Through%20The%20Ages.pdf";
  folder=this.route.snapshot.params['folder'];
  filename=this.route.snapshot.params['filename'];
  originalname=this.route.snapshot.params['originalname'];
  heading=this.route.snapshot.params['heading'];
  pdfSrc:string="https://coconutc-docs.s3.ap-south-1.amazonaws.com/"+this.folder+"/"+this.filename;
  // pdfSrc:string="https://coconutc-docs.s3.ap-south-1.amazonaws.com/Fri+Aug+09+2019-1565373047011-J.K.+Rowling+-+HP+5+-+Harry+Potter+and+the+Order+of+the+Phoenix.pdf"
  showLoader:boolean=true;
  page=2;
  

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }
  callBackFn(data)
  {
    console.log(data)
    console.log("Render complete")
    this.showLoader=false;
  }

}
