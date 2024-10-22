import { Injectable } from '@angular/core';
import { computed, signal, WritableSignal } from 'ngx-signal-polyfill';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';


interface User {
  name: string;
  age: number;
}


function fetchUser() {
  return interval(1000).pipe(take(1), map(() => {
    return { name: 'User', age: Math.floor(Math.random() * 40) + 16 } as User;
  }));
}

function trackLoading<T>(inProgress: WritableSignal<boolean>): Observable<void> {
  inProgress.set(true);
  return of(undefined).pipe(finalize(() => inProgress.set(false)));
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  number = signal(0);
  number1 = new BehaviorSubject(0);
  number2 = new BehaviorSubject(0);

  name = signal<string | null>(null);
  age = signal<number | null>(null);
  isLoaded = computed(() => !!this.name() && !!this.age());
  inProgress = signal(false);

  constructor() {
  }


  increase() {
    this.number.set(this.number() + 1);
  }

  decrease() {
    this.number.set(this.number() - 1);
  }

  fetchUser() {
    this.inProgress.set(true);
    this.name.set('-');
    this.age.set(null);

    fetchUser().subscribe(({ name, age }) => {
      this.inProgress.set(false);
      this.name.set(name);
      this.age.set(age);
    });
  }


  changeNumber1() {
    this.number1.next(this.number1.value + 1);
    this.number2.next(this.number2.value - 1);
  }
}


