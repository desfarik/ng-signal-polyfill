import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { StoreService } from '../store.service';
import { computed, signal } from 'ngx-signal-polyfill';

@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child1Component implements OnDestroy {

  a = computed(() => `value from store: ${this.store.number()}`);
  counter = signal(0);
  switchable = this.counter;

  constructor(public store: StoreService) {
  }

  public ChangeDetectionCount = 0;

  public get GetChangeDetectionCount() {
    return this.ChangeDetectionCount++;
  }

  ngOnDestroy(): void {
  }

  change() {
    this.counter.set(this.counter() + 1);
    this.store.increase();
  }

  switch() {
    this.switchable = this.switchable === this.counter ? this.store.number : this.counter;
  }
}
