import { ChangeDetectionStrategy, Component } from '@angular/core';
import { signal } from 'ngx-signal-polyfill';

@Component({
  selector: 'app-readme-signal',
  template: `
    <p>Counter: {{ counter | signal }}</p>
    <div>
      <button (click)="increment()">increment</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadmeSignalComponent {
  counter = signal(0);

  increment() {
    this.counter.set(this.counter() + 1);
  }
}
