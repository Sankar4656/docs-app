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
  docName: string;

  regex_string: RegExp;
  regex_arr: any;
  fields = [];
  replace_string: RegExp;

  constructor(@Inject('DOCUMENTS') public Documents: any[], private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      
      this.regex_string = /<<[a-zA-Z0-9 _,]*>>/g;
      this.paragraph = documents[id - 1].doc;
      this.docName = documents[id - 1].name;
      let count = 0;
      do {
        this.regex_arr = this.regex_string.exec(this.paragraph);
              
        // pushing the input/text/textarea fields into fields array
        if(this.regex_arr){
          let field_name = this.regex_arr[0].replace(/<< /g, '').replace(/ >>/g, '').split(" ", 2)
          if (this.fields.indexOf(field_name) === -1) {
            this.fields.push(field_name);
            this.replace_string = new RegExp("<< " + field_name[0] + " " + field_name[1] + " >>", "g");
            this.newParagraph = this.paragraph.replace(this.replace_string, '<b class="preview-elements '+ field_name[0] +'"></b>');
            this.paragraph = this.newParagraph;
          }
          
          count++;
        }
      } while (this.regex_arr);
      
    });
    
  }

}
