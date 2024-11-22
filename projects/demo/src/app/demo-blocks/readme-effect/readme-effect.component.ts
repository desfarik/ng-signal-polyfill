import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { effect, signal } from 'ngx-signal-polyfill';

@Component({
  selector: 'app-readme-effect',
  template: `
    <p>Counter: {{ counter | signal }}</p>
    <div>
      <button (click)="increment()">increment</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadmeEffectComponent implements OnDestroy {
  counter = signal(0);

  effectRef = effect(() => {
    console.log(`effect: counter changed - ${this.counter()}`);
  });

  ngOnDestroy(): void {
    this.effectRef.destroy();
    console.log('effect: ref destroyed');
  }

  increment() {
    this.counter.set(this.counter() + 1);
  }
}
