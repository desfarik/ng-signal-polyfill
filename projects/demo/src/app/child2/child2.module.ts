import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Child2Component } from './child2.component';
import { SignalPipeModule } from 'ngx-signal-polyfill';


@NgModule({
  declarations: [Child2Component],
  exports: [Child2Component],
  imports: [
    CommonModule,
    SignalPipeModule,
  ],
  providers: [
  ],
})
export class Child2Module { }
