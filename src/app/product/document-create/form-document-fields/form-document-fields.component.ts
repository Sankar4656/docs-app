import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { DocumentCreateService } from '../document-create.service';

import jspdf from 'jspdf';
import * as _html2canvas from 'html2canvas';
const html2canvas: any = _html2canvas;

@Component({
  selector: 'app-form-document-fields',
  templateUrl: './form-document-fields.component.html',
  styleUrls: ['./form-document-fields.component.css']
})
export class FormDocumentFieldsComponent implements OnInit, OnDestroy {

  dataSubscription: Subscription;
  dataSubscriptionTwo: Subscription;
  exportTo: any;
  innerHtml: any;
  @Input() fields = [];


  constructor(private documentCreateService: DocumentCreateService) { }

  DocForm = new FormGroup({});


  ngOnInit() {
    //building formcontrols
    this.fields.forEach(x=>{
      this.DocForm.addControl(x[0],new FormControl('',[Validators.required]))
    })

    this.dataSubscription = this.DocForm.valueChanges.subscribe(val => {
      if (!(document.body.classList.contains('form-filled'))) {
        if (this.DocForm.valid) {
          document.body.className += ' form-filled';
        }
      }
      this.documentCreateService.updateMessage(val);
    });
    this.dataSubscriptionTwo = this.documentCreateService.getHtml()
      .subscribe(mymessage => this.innerHtml = mymessage);

  }


  onSubmit(buttonType) {        
    if(this.DocForm.valid) {
      if(buttonType==="pdf") {
        this.makePdf();
      }
      if(buttonType==="doc"){
        this.exportToDoc();
      }
    }  
  }

  public makePdf() {
    const data = this.innerHtml;
    
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'cm', 'a4'); //Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
      pdf.save('Filename.pdf');   
    });
  }

  public exportToDoc() {
    const header = '<html xmlns:o=\"urn:schemas-microsoft-com:office:office\" ' +
      'xmlns:w="urn:schemas-microsoft-com:office:word" ' +
      'xmlns="http://www.w3.org/TR/REC-html40">' +
      '<head><meta charset="utf-8"><title>Export HTML to Word Document with JavaScript</title></head><body>';
    const footer = '</body></html>';
    const sourceHTML = header + this.innerHtml.innerHTML + footer;
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'document.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.dataSubscriptionTwo.unsubscribe();
  }

}
