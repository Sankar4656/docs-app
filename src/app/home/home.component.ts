import { Component, OnInit, Inject } from '@angular/core';
import { documents } from '../documents';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(@Inject('DOCUMENTS') public Documents: any[]) { }

  ngOnInit() {
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

}
