import { Component, ViewChild } from '@angular/core';
import { CropperComponent } from 'angular-cropperjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  config = {
    aspectRatio: 16 / 9
  }

  @ViewChild('cropper') public angularCropper: CropperComponent;

  onChange(event) {
    console.log(event)
  }
}
