import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Child1Module } from './child1/child1.module';
import { Child2Module } from './child2/child2.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Child1Module,
    Child2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
