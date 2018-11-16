import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AngularCropperjsModule } from 'angular-cropperjs';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ImageThumbComponent } from './image-thumb.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, BrowserModule, AngularCropperjsModule ],
  declarations: [ AppComponent, HelloComponent, ImageThumbComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
