import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { effect, signal } from 'ngx-signal-polyfill';

enum DEMOS {
  README_SIGNAL = 'Readme signal',
  README_COMPUTED = 'Readme computed',
  README_EFFECT = 'Readme effect',
  README_TO_OBSERVABLE = 'Readme toObservable',
  README_TO_SIGNAL = 'Readme toSignal',
  TWO_CHILDREN = 'Two children',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {

  DEMOS = DEMOS;

  currentDemo = signal<DEMOS>(this.restoreDemo() || DEMOS.README_SIGNAL);

  effectRef = effect(() => {
    localStorage.setItem('currentDemo', this.currentDemo());
  });

  openDemo(demo: DEMOS) {
    this.currentDemo.set(demo);
  }

  private restoreDemo(): DEMOS | undefined {
    return localStorage.getItem('currentDemo') as DEMOS;
  }

  ngOnDestroy(): void {
    this.effectRef.destroy();
  }

}
