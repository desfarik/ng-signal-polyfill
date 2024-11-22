import { Component, OnInit } from '@angular/core';
import { signal, WritableSignal } from 'ngx-signal-polyfill';

@Component({
  selector: 'app-two-children-demo',
  template: `
    <div>
      <button (click)="toggleHide(child1Visible)">hide</button>
      <hr>
      <app-child1 *ngIf="child1Visible | signal"></app-child1>
    </div>
    <div>
      <button (click)="toggleHide(child2Visible)">hide</button>
      <hr>
      <app-child2 *ngIf="child2Visible | signal"></app-child2>
    </div>`,
  styles: [':host() { display: flex; gap: 30px;}']
})
export class TwoChildrenDemoComponent implements OnInit {
  child1Visible = signal(true);
  child2Visible = signal(true);

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleHide(visible: WritableSignal<boolean>) {
    visible.set(!visible());
  }
}
