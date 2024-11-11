/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Watch, watch } from '../signals';

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
    allowSignalWrites: boolean): EffectRef {
    const zone = (typeof Zone === 'undefined') ? null : Zone.current;
    const w = watch(effectFn, (watch) => {
      if (!this.all.has(watch)) {
        return;
      }
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

    const destroy = () => {
      console.log('effect destroy');
      w.cleanup();
      this.all.delete(w);
      this.queue.delete(w);
    };

    return {
      destroy
    };
  }

  flush(): void {
    if (this.queue.size === 0) {
      return;
    }

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
  /**
   * @deprecated
   * @see Use `toObservable` instead.
   *
   * Whether the `effect` should allow writing to signals.
   *
   * Using effects to synchronize data by writing to signals can lead to confusing and potentially
   * incorrect behavior, and should be enabled only when necessary.
   *
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
  return effectManager.create(effectFn, !!options?.allowSignalWrites);
}
