import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Child1Component } from './child1.component';
import { SignalPipeModule } from 'ngx-signal-polyfill';


@NgModule({
  declarations: [Child1Component],
  exports: [Child1Component],
  imports: [
    CommonModule,
    SignalPipeModule,
  ],
  providers: [
  ],
})
export class Child1Module { }
