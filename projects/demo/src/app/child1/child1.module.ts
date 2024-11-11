import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Child1Component } from './child1.component';
import { SignalModule } from 'ngx-signal-polyfill';


@NgModule({
  declarations: [Child1Component],
  exports: [Child1Component],
  imports: [
    CommonModule,
    SignalModule,
  ],
  providers: [
  ],
})
export class Child1Module { }
