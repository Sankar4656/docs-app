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

  regex_string: RegExp;
  m: any;
  fields = [];

  constructor(@Inject('DOCUMENTS') public Documents: any[], private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      
      this.regex_string = /<<[a-zA-Z0-9 _,]*>>/g;
      this.paragraph = documents[id - 1].doc;
      do {
        this.m = this.regex_string.exec(this.paragraph);
        // pushing the input/text/textarea fields into fields array
        if(this.m){
          this.fields.push(this.m[0].replace(/<< /g, '').replace(/ >>/g, '').split(" ", 2));
        }
      } while (this.m);
      console.log(this.fields);
    });
    
  }

}
