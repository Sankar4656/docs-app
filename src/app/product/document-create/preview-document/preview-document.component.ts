import { Component, OnInit, OnDestroy , ViewChild, ElementRef, Input} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { DocumentCreateService } from '../document-create.service';

@Component({
  selector: 'app-preview-document',
  templateUrl: './preview-document.component.html',
  styleUrls: ['./preview-document.component.css',]
})
export class PreviewDocumentComponent implements OnInit, OnDestroy {

  @ViewChild('pdfContent') pdfContent: ElementRef;
  @Input() newParagraph = '';
  @Input() docName = '';

  dataSubscription: Subscription;
  formFieldValues: {};
  previewHtml: any;
  previewElement: any;
  fieldvalues = [];

  constructor(private documentCreateService: DocumentCreateService) { }

  ngOnInit() {
    this.dataSubscription = this.documentCreateService.getMessage()
      .subscribe(mymessage => {
        this.formFieldValues = mymessage;
        if (document.body.classList.contains('form-filled')) {
          this.previewHtml = this.pdfContent.nativeElement;
          this.documentCreateService.updateHtml(this.previewHtml);
        }
        this.fieldvalues = Object.values(this.formFieldValues);
        
        
        this.textSlides(this.formFieldValues);
      })
  }

  ngAfterViewInit() {
    this.showSlides();
  }

  showSlides = () => {
    const slides = document.getElementsByClassName('preview-elements');

    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i] as HTMLElement;
        slide.style.borderBottom = "1px solid black";
        slide.style.minWidth = "60px";
        slide.style.display = "inline-block";
        slide.style.padding = "0 5px";
    }
  };

  textSlides = (formFieldValues: any) => {

    console.log(formFieldValues);
    
    Object.keys(formFieldValues).forEach(key => {
      let value = formFieldValues[key];
      const slides = document.getElementsByClassName(key);
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i] as HTMLElement;
        slide.innerHTML = value;
      }
    })
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
