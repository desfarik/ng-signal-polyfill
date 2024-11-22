import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { computed, effect, toObservable } from 'ngx-signal-polyfill';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-child2',
  templateUrl: './child2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child2Component implements OnInit, OnDestroy {

  a = computed(() => `value from store: ${this.store.number()}`);

  files = [
    { name: 'name 1' },
    { name: 'name 2' },
    { name: 'name 3' },
    { name: 'name 4' }
  ];

  effectUnsubscribe = effect(() => {
    console.log(`effect inprogress ${this.store.inProgress()}`);
  }, { allowSignalWrites: true });

  obsSubs = toObservable(this.store.inProgress).subscribe(v => {
    console.log('sub ' + v);
    this.store.increase();
  });

  constructor(public store: StoreService, injector: Injector) {


  }

  ngOnDestroy(): void {
    this.effectUnsubscribe.destroy();
    this.obsSubs.unsubscribe();
  }

  ngOnInit(): void {
  }

  decrease() {
    this.store.decrease();
  }

}
