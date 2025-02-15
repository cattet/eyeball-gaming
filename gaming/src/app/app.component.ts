import { Component } from '@angular/core';
import { SimComponent } from './sim/sim.component'; 

@Component({
  selector: 'app-root',
  imports: [SimComponent],
  template:
  `
    <main>
      <header>
      </header>
      <section class="content">
        <app-sim></app-sim>
      </section>
    </main>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gaming';
}
