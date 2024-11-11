import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { computed } from 'ngx-signal-polyfill';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-child2',
  templateUrl: './child2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child2Component implements OnInit {

  a = computed(() => `value from store: ${this.store.number()}`);

  files = [
    { name: 'name 1' },
    { name: 'name 2' },
    { name: 'name 3' },
    { name: 'name 4' }
  ];

  constructor(public store: StoreService) {
  }

  ngOnInit(): void {
  }

  decrease() {
    this.store.decrease();
  }

}
