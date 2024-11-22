import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalPipeModule } from 'ngx-signal-polyfill';
import { Child1Component } from './child1/child1.component';
import { Child2Component } from './child2/child2.component';
import { TwoChildrenDemoComponent } from './two-children-demo.component';


@NgModule({
  declarations: [Child1Component, Child2Component, TwoChildrenDemoComponent],
  exports: [TwoChildrenDemoComponent],
  imports: [
    CommonModule,
    SignalPipeModule
  ],
  providers: []
})
export class TwoChildrenModule {
}
