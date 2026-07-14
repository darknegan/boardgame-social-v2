import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  template: `
    <div class="auth-layout">
      <section class="brand-panel" aria-label="Branding">
        <p class="overline">Game Night</p>
        <h1 class="title">Roll, play, repeat</h1>
        <p class="subtitle">
          Track your collection, log plays, and connect with fellow tabletop gamers.
        </p>
      </section>
      <section class="form-panel">
        <router-outlet />
      </section>
    </div>
  `,
  styles: `
    .auth-layout {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .brand-panel {
      padding: var(--space-4xl);
      background: linear-gradient(145deg, var(--color-grad-start), var(--color-grad-end));
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: var(--space-lg);
    }

    .overline {
      margin: 0;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      opacity: 0.9;
    }

    .title {
      margin: 0;
      font-family: 'Fraunces', serif;
      font-weight: 900;
      font-size: clamp(2.5rem, 4vw, 3.5rem);
      line-height: 1.05;
    }

    .subtitle {
      margin: 0;
      max-width: 28rem;
      font-size: 1.125rem;
      line-height: 1.5;
      opacity: 0.92;
    }

    .form-panel {
      display: grid;
      place-items: center;
      padding: var(--space-3xl);
      background: var(--color-bg-base);
    }

    @media (max-width: 900px) {
      .auth-layout {
        grid-template-columns: 1fr;
      }

      .brand-panel {
        min-height: 240px;
        padding: var(--space-2xl);
      }
    }
  `,
})
export class AuthLayoutComponent {}
