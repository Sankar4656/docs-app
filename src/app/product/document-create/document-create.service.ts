import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DocumentCreateService {

  private fieldValues = new BehaviorSubject('');
  private innerHtml = new BehaviorSubject('');

  getMessage() {
    return this.fieldValues.asObservable();
  }

  updateMessage(message1: string) {
    this.fieldValues.next(message1);
  }

  getHtml() {
    return this.innerHtml.asObservable();
  }

  updateHtml(message2: string) {
    this.innerHtml.next(message2);
  }



  constructor() { }

}
