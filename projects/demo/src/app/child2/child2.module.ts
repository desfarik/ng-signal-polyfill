import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Child2Component } from './child2.component';
import { SignalModule } from 'ngx-signal-polyfill';


@NgModule({
  declarations: [Child2Component],
  exports: [Child2Component],
  imports: [
    CommonModule,
    SignalModule,
  ],
  providers: [
  ],
})
export class Child2Module { }
