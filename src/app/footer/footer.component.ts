import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <mat-toolbar fxLayout="row" fxLayoutAlign="flex-end center" style="position: relative;">
      <p class="mat-caption">© Copyright Brand Name 2020.</p>
    </mat-toolbar>
  `,
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
