import { ChangeDetectionStrategy, Component } from '@angular/core';
import { signal, WritableSignal } from 'ngx-signal-polyfill';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  child1Visible = signal(true);
  child2Visible = signal(true);

  toggleHide(signal: WritableSignal<boolean>) {
    signal.set(!signal());
  }
}
