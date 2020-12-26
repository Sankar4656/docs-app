import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { DocumentCreateService } from '../document-create.service';

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

    //building formcontrols
    this.fields.forEach(x=>{
      this.DocForm.addControl(x[0],new FormControl('',Validators.required))
    })
  }


  onSubmit() {
    if (this.DocForm.valid) {
      if (this.exportTo === 'doc') {
        this.exportToDoc(this.innerHtml);
      } else {
        this.makePdf(this.innerHtml);
      }
    }
  }

  public doc(): void {
    this.exportTo = 'doc';
  }

  public pdf(): void {
    this.exportTo = 'pdf';
  }

  public makePdf(data: any) {
    console.log(data);
  }

  public exportToDoc(data: any) {
    const header = '<html xmlns:o=\"urn:schemas-microsoft-com:office:office\" ' +
      'xmlns:w="urn:schemas-microsoft-com:office:word" ' +
      'xmlns="http://www.w3.org/TR/REC-html40">' +
      '<head><meta charset="utf-8"><title>Export HTML to Word Document with JavaScript</title></head><body>';
    const footer = '</body></html>';
    const sourceHTML = header + data + footer;
    console.log(sourceHTML);
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
