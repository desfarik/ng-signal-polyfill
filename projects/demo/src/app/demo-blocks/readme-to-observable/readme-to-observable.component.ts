import { ChangeDetectionStrategy, Component } from '@angular/core';
import { signal, toObservable } from 'ngx-signal-polyfill';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-readme-to-observable',
  template: `
    <p>Counter: {{ counter | signal }}</p>
    <p>Counter x2: {{ counterX2$ | async }}</p>
    <div>
      <button (click)="increment()">increment</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadmeToObservableComponent {
  counter = signal(0);

  counterX2$ = toObservable(this.counter)
    .pipe(map(x => x * 2));

  increment() {
    this.counter.set(this.counter() + 1);
  }
}
