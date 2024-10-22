/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injectable, Injector, OnDestroy, ɵɵinject} from '@angular/core';
import {Watch, watch} from '../signals';
import 'zone.js';

/**
 * An effect can, optionally, register a cleanup function. If registered, the cleanup is executed
 * before the next effect run. The cleanup function makes it possible to "cancel" any work that the
 * previous effect run might have started.
 *
 * @developerPreview
 */
export type EffectCleanupFn = () => void;

/**
 * A callback passed to the effect function that makes it possible to register cleanup logic.
 */
export type EffectCleanupRegisterFn = (cleanupFn: EffectCleanupFn) => void;

/**
 * Tracks all effects registered within a given application and runs them via `flush`.
 */
export class EffectManager {
  private all = new Set<Watch>();
  private queue = new Map<Watch, Zone | null>();
  private hasQueuedFlush = false;
  create(
    effectFn: (onCleanup: (cleanupFn: EffectCleanupFn) => void) => void,
    destroyRef: DestroyRef | null, allowSignalWrites: boolean): EffectRef {
    const zone = (typeof Zone === 'undefined') ? null : Zone.current;
    const w = watch(effectFn, (watch) => {
      if (!this.all.has(watch)) {
        return;
      }
      console.log('register change');
      this.queue.set(watch, zone);
      if (!this.hasQueuedFlush) {
        this.hasQueuedFlush = true;

        queueMicrotask(() => {
          this.hasQueuedFlush = false;
          this.flush();
        });
      }

    }, allowSignalWrites);

    this.all.add(w);

    // Effects start dirty.
    w.notify();

    let unregisterOnDestroy: (() => void) | undefined;

    const destroy = () => {
      w.cleanup();
      unregisterOnDestroy?.();
      this.all.delete(w);
      this.queue.delete(w);
      console.log('clean');
    };

    unregisterOnDestroy = destroyRef?.onDestroy(destroy);

    return {
      destroy,
    };
  }

  flush(): void {
    if (this.queue.size === 0) {
      return;
    }
    console.log('flush');

    for (const [watch, zone] of this.queue) {
      this.queue.delete(watch);
      if (zone) {
        zone.run(() => watch.run());
      } else {
        watch.run();
      }
    }
  }

  get isQueueEmpty(): boolean {
    return this.queue.size === 0;
  }
}

/**
 * A global reactive effect, which can be manually destroyed.
 *
 * @developerPreview
 */
export interface EffectRef {
  /**
   * Shut down the effect, removing it from any upcoming scheduled executions.
   */
  destroy(): void;
}

/**
 * Options passed to the `effect` function.
 *
 * @developerPreview
 */
export interface CreateEffectOptions {
/*  /!**
   * The `Injector` in which to create the effect.
   *
   * If this is not provided, the current [injection context](guide/dependency-injection-context)
   * will be used instead (via `inject`).
   *!/
  injector?: Injector;*/

/*  /!**
   * Whether the `effect` should require manual cleanup.
   *
   * If this is `false` (the default) the effect will automatically register itself to be cleaned up
   * with the current `DestroyRef`.
   *!/
  manualCleanup?: boolean;*/

  /**
   * Whether the `effect` should allow writing to signals.
   *
   * Using effects to synchronize data by writing to signals can lead to confusing and potentially
   * incorrect behavior, and should be enabled only when necessary.
   */
  allowSignalWrites?: boolean;
}


/**
 * Create a global `Effect` for the given reactive function.
 *
 * @developerPreview
 */

const effectManager = new EffectManager();
export function effect(
  effectFn: (onCleanup: EffectCleanupRegisterFn) => void,
  options?: CreateEffectOptions): EffectRef {
  return effectManager.create(effectFn, null, !!options?.allowSignalWrites);
}


class DestroyRef {

  onDestroyService: OnDestroyService;

  constructor(private parentInjector: Injector) {
    const injector = Injector.create({
      providers: [{provide: OnDestroyService}],
      parent: this.parentInjector,
    });
    this.onDestroyService = injector.get(OnDestroyService);
  }

  onDestroy(callback: () => void): () => void {
    this.onDestroyService.addCallback(callback)
    return () => this.onDestroyService.removeCallback(callback);
  }
}


type Callback = () => any;

@Injectable()
class OnDestroyService implements OnDestroy {
  private callbacks: Array<Callback> = [];

  ngOnDestroy(): void {
    this.callbacks.forEach(callback => callback());
    this.callbacks = [];
    console.log('destroy');
  }

  addCallback(callback: Callback) {
    console.log('addCallback');
    this.callbacks.push(callback);
  }

  removeCallback(callback: Callback) {
    console.log('removeCallback');

    this.callbacks = this.callbacks.filter(fn => fn !== callback);
  }

}
