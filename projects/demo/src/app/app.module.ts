import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignalPipeModule } from 'ngx-signal-polyfill';
import { ReadmeSignalComponent } from './demo-blocks/readme-signal/readme-signal.component';
import { ReadmeComputedComponent } from './demo-blocks/readme-computed/readme-computed.component';
import { ReadmeEffectComponent } from './demo-blocks/readme-effect/readme-effect.component';
import { ReadmeToObservableComponent } from './demo-blocks/readme-to-observable/readme-to-observable.component';
import { TwoChildrenModule } from './demo-blocks/two-children-demo/two-children.module';

@NgModule({
  declarations: [
    AppComponent,
    ReadmeSignalComponent,
    ReadmeComputedComponent,
    ReadmeEffectComponent,
    ReadmeToObservableComponent
  ],
  imports: [
    BrowserModule,
    SignalPipeModule,
    TwoChildrenModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
