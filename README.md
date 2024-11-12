# ngx-signal-polyfill

## Overview

**ngx-signal-polyfill** — library for supporting signals in old versions of angular
This library provides support for signals in Angular, offering a range of features to enhance your development experience.

## Version Compatibility

| Angular Version | Library Version |
|-----------------|-----------------|
| 8               | 8.x             |
| 9               | 9.x             |
| 10              | 10.x            |
| 11              | 11.x            |
| >=12            | 12.x            |

## API Compatibility

| Feature          | Angular Compatibility  | Notes                                                                               |
|------------------|------------------------|-------------------------------------------------------------------------------------|
| **Primitives**   |                        |                                                                                     |
| computed         | ✅ Fully supported      | Fully compatible with Angular's computed properties.                                |
| signal           | ✅ Fully supported      | Fully compatible with Angular's signal properties.                                  |
| effect           | ⚠️ Partially supported | No support for injector and manualCleanup options.                                  |
|                  |                        | manualCleanup is always enabled, so remember to clean up subscriptions manually.    |
|                  |                        | Recommendation: Avoid using effect. Use the safer and simpler toObservable instead. |
| **RxJS Interop** |
| toObservable     | ⚠️ Partially supported | Only manual unsubscription is supported, without injector provider.                 |
| toSignal         | ❌ Not supported        | No support for converting observables to signals.                                   |

## Future Plans

• Migration Tool: We plan to develop a migration tool to help you transition to Angular 16, allowing you to replace the polyfill with native signal support.

•  [Signal queries](https://angular.dev/guide/signals/queries) ViewChild and ViewChildren Support: Development is underway to support ViewChild and ViewChildren.

•  [Signal inputs](https://angular.dev/guide/signals/inputs) Signal inputs: Input Signal: We are working on adding support for input signals.

