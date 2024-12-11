/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Observable, ReplaySubject } from 'rxjs';
import { Signal, untracked } from '../../signals';
import { effect } from '../../reactivity/effect';
import { Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';

/**
 * Options for `toObservable`.
 *
 * @developerPreview
 */
export interface ToObservableOptions {

}

/**
 * Exposes the value of an Angular `Signal` as an RxJS `Observable`.
 *
 * The signal's value will be propagated into the `Observable`'s subscribers using an `effect`.
 *
 * `toObservable` must be called in an injection context unless an injector is provided via options.
 *
 * @developerPreview
 */
export function toObservable<T>(
  source: Signal<T>
): Observable<T> {
  const subject = new ReplaySubject<T>(1);

  const watcher = effect(() => {
    let value: T;
    try {
      value = source();
    } catch (err) {
      untracked(() => subject.error(err));
      return;
    }
    untracked(() => subject.next(value));
  });

  return subject.asObservable().pipe(finalize(() => {
    watcher.destroy();
  }));
}
