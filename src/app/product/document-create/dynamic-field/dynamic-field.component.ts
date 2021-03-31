import { AfterViewInit, Component, ElementRef, forwardRef, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, DefaultValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

export const CUSTOM_INPUT_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DynamicFieldComponent),
  multi: true
}

@Component({
  selector: 'app-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [CUSTOM_INPUT_ACCESSOR]
})
export class DynamicFieldComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input() DocForm: FormGroup;
  @Input() name: string;
  @Input() type: string = 'text';
  @ViewChild('nameInput') inputref: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  @ViewChild(DefaultValueAccessor) valueAccessor: DefaultValueAccessor;

  delegatedMethodCalls = new ReplaySubject<(_: ControlValueAccessor) => void>();

  ngAfterViewInit(): void {
    this.delegatedMethodCalls.subscribe(fn => fn(this.valueAccessor));
  }

  registerOnChange(fn: (_: any) => void): void {
    this.delegatedMethodCalls.next(valueAccessor => valueAccessor.registerOnChange(fn));
  }
  registerOnTouched(fn: () => void): void {
    this.delegatedMethodCalls.next(valueAccessor => valueAccessor.registerOnTouched(fn));
  }

  setDisabledState(isDisabled: boolean): void {
    this.delegatedMethodCalls.next(valueAccessor => valueAccessor.setDisabledState(isDisabled));
  }

  writeValue(obj: any): void {
    this.delegatedMethodCalls.next(valueAccessor => valueAccessor.writeValue(obj));
  }

  humanize(str) {
    var i, frags = str.split('_');
    for (i=0; i<frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return 'Please Enter ' + frags.join(' ');
  }

}
