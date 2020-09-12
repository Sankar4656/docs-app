import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar>
      <img [routerLink]="['/']" src="assets/logo.jpg" alt="logo" height="60">
      <span class="example-spacer"></span>
      <button mat-button color="primary">Manage Account</button>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
