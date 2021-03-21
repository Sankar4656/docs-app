import { Component, OnInit, Inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { documents } from '../../documents';

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.css']
})
export class DocumentCreateComponent implements OnInit {

  paragraph: string;
  newParagraph: string;

  regex_string: RegExp;
  m: any;
  fields = [];

  constructor(@Inject('DOCUMENTS') public Documents: any[], private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      
      this.regex_string = /<<[a-zA-Z0-9 _,]*>>/g;
      this.paragraph = documents[id - 1].doc;
      let count = 0;
      do {
        this.m = this.regex_string.exec(this.paragraph);
        // pushing the input/text/textarea fields into fields array
        if(this.m){
          this.fields.push(this.m[0].replace(/<< /g, '').replace(/ >>/g, '').split(" ", 2));
          count++;
        }
      } while (this.m);
      
      this.newParagraph = this.paragraph.replace(this.regex_string, '<b class="preview-elements"></b>');
    });
    
  }

}
