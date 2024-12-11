import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';


@Injectable()
export class Destroy$ extends ReplaySubject<void> implements OnDestroy {
  constructor() {
    super(1);
  }

  ngOnDestroy() {
    this.next();
    this.complete();
  }
}
