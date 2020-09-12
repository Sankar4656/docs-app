import { Component, OnInit, OnDestroy , ViewChild, ElementRef} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { DocumentCreateService } from '../document-create.service';

@Component({
  selector: 'app-preview-document',
  templateUrl: './preview-document.component.html',
  styleUrls: ['./preview-document.component.css']
})
export class PreviewDocumentComponent implements OnInit, OnDestroy {

  @ViewChild('pdfContent') pdfContent: ElementRef;


  dataSubscription: Subscription;
  dataSubscriptionTwo: Subscription;
  formFieldValues: {};
  previewHtml: any;
  previewElement: any;

  constructor(private documentCreateService: DocumentCreateService) { }

  ngOnInit() {
    this.dataSubscription = this.documentCreateService.getMessage()
      .subscribe(mymessage => {
        this.formFieldValues = mymessage;
        if (document.body.classList.contains('form-filled')) {
          this.previewHtml = this.pdfContent.nativeElement.innerHTML;
          this.documentCreateService.updateHtml(this.previewHtml);
        }
      });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.dataSubscriptionTwo.unsubscribe();
  }
}
