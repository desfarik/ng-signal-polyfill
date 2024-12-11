import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class DestroyRef implements OnDestroy {
  private callbacks: Array<() => void> = [];

  ngOnDestroy() {
    this.callbacks.forEach(callback => callback());
  }

  onDestroy(callback: () => void): () => void {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }
}

