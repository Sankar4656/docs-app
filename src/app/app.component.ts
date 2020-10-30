import { Component } from '@angular/core';
import {Angular2TokenService} from 'angular2-token';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet class="mt-block-60"></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(private authToken: Angular2TokenService) {
    this.authToken.init(environment.token_auth_config);
  }
}
