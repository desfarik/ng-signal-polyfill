import { ChangeDetectionStrategy, Component } from '@angular/core';
import { computed, signal } from 'ngx-signal-polyfill';

@Component({
  selector: 'app-readme-computed',
  template: `
    <p>Counter: {{ counter | signal }}</p>
    <p>Computed x2: {{ counterX2 | signal }}</p>
    <div>
      <button (click)="increment()">increment</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadmeComputedComponent {
  counter = signal(0);
  counterX2 = computed(() => this.counter() * 2);

  increment() {
    this.counter.set(this.counter() + 1);
  }
}
