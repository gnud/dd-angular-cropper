import {
  Component,
  Input,
  forwardRef,
  AfterViewInit,
  OnChanges,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ImageThumbComponent),
  multi: true
};

@Component({
  selector: 'app-image-thumb',
  templateUrl: './image-thumb.component.html',
  styleUrls: ['./image-thumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class ImageThumbComponent implements ControlValueAccessor, AfterViewInit, OnChanges {
  @Input() type = 'file';
  // ID attribute for the field and for attribute for the label
  @Input() idd = '';
  // The field name text . used to set placeholder also if no pH (placeholder) input is given
  @Input() text = '';
  // placeholder input
  @Input() pH: string;
  @Input() public thumbType: string;
  @Input() c: FormControl = new FormControl();

  // errors for the form control will be stored in this array
  errors: Array<any> = ['This field is required'];

  // get reference to the input element
  @ViewChild('fileinput') inputRef: ElementRef;

  // The internal data model for form control value access
  public innerValue: any = '';

  public thumbTypeSelected: string;

  constructor() {
    switch (this.thumbType) {
      case 'logo':
        this.thumbTypeSelected = 'logo';
        break;
      case 'banner':
        this.thumbTypeSelected = 'banner';
        break;
      case 'avatar':
        this.thumbTypeSelected = 'avatar';
        break;
    }
  }

  ngOnChanges() {

  }

  base64() {
    return new Promise((resolve, reject) => {
      const file = this.inputRef.nativeElement.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  ngAfterViewInit(): void {
    this.inputRef.nativeElement.addEventListener('change', (ev) => {
      this.base64().then(data => {
        this.c.setValue(data);
      })
    });


    // set placeholder default value when no input given to pH property
    if (this.pH === undefined) {
      this.pH = this.text;
    }

    // RESET the custom input form control UI when the form control is RESET
    this.c.valueChanges.subscribe(
      () => {
        // check condition if the form control is RESET
        if (this.c.value === '' || this.c.value == null || this.c.value === undefined) {
          this.innerValue = '';
          this.inputRef.nativeElement.value = '';
        }
      }
    );
  }

  // event fired when input value is changed . later propagated up to the form control using the custom value accessor interface
  onChange(e: Event, value: any) {
    // set changed value
    this.innerValue = value;
    // propagate value into form control using control value accessor interface
    this.propagateChange(this.innerValue);

    // reset errors
    this.errors = [];
    // setting, resetting error messages into an array (to loop) and adding the validation messages to show below the field area
    for (const key in this.c.errors) {
      if (this.c.errors.hasOwnProperty(key)) {
        if (key === 'required') {
          this.errors.push('This field is required');
        } else {
          this.errors.push(this.c.errors[key]);
        }
      }
    }
  }

  // get accessor
  get value(): any {
    return this.innerValue;
  };

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  // propagate changes into the custom form control
  propagateChange = (_: any) => {
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    this.innerValue = value;
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {

  }
}
