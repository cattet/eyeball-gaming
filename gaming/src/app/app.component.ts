import { Component } from '@angular/core';
import {HomeComponent} from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [HomeComponent],
  template:
  `
    <main>
      <header>
      </header>
      <section class="content">
        <app-home></app-home>
      </section>
    </main>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gaming';
}
