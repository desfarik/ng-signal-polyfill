import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignalPipe} from "./signal.pipe";


@NgModule({
  exports: [SignalPipe],
  declarations: [SignalPipe],
  imports: [
    CommonModule
  ],
})
export class SignalPipeModule {
}
