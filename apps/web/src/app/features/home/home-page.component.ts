import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FeedPost } from '@bgs/shared';
import { SocialApiService } from '../../core/api/social-api.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, ReactiveFormsModule, EmptyStateComponent, SkeletonComponent],
  template: `
    <app-page-header
      title="Your game night HQ"
      subtitle="See what your friends are playing, logging, and ranking."
      overline="Social feed"
    />

    <form class="composer card" [formGroup]="composeForm" (ngSubmit)="createPost()">
      <textarea
        class="input"
        formControlName="body"
        rows="2"
        placeholder="Share an update…"
      ></textarea>
      <button class="btn btn-primary" type="submit" [disabled]="!composeForm.value.body?.trim() || posting()">
        Post
      </button>
    </form>

    @if (loading()) {
      <div class="feed-grid">
        @for (i of [1, 2, 3]; track i) {
          <app-skeleton height="160px" />
        }
      </div>
    } @else if (posts().length === 0) {
      <app-empty-state
        title="Feed is quiet"
        message="Post an update or add friends to see their activity."
        icon="🏠"
      />
    } @else {
      <div class="feed-grid">
        @for (post of posts(); track post.id) {
          <article class="card feed-card">
            <header class="feed-card__header">
              <div class="avatar">
                @if (post.author_avatar_url) {
                  <img [src]="post.author_avatar_url" alt="" />
                } @else {
                  {{ initials(post) }}
                }
              </div>
              <div>
                <p class="author">{{ post.author_display_name ?? post.author_username }}</p>
                <p class="time">{{ formatTime(post.created_at) }}</p>
              </div>
              <span class="badge">{{ post.type }}</span>
            </header>
            <p class="body">{{ post.body }}</p>
            @if (post.game_name) {
              <div class="game-chip">{{ post.game_name }}</div>
            }
            <footer class="feed-card__footer">
              <button
                type="button"
                class="action-btn"
                [class.liked]="post.liked_by_me"
                (click)="toggleLike(post)"
              >
                ❤️ {{ post.like_count }}
              </button>
              <button type="button" class="action-btn" (click)="toggleComments(post.id)">
                💬 {{ post.comment_count }}
              </button>
            </footer>

            @if (expandedComments() === post.id) {
              <div class="comments">
                <form class="comment-form" (ngSubmit)="addComment(post.id, commentInput.value); commentInput.value = ''">
                  <input #commentInput class="input" type="text" placeholder="Write a comment…" />
                  <button class="btn btn-secondary" type="submit">Reply</button>
                </form>
              </div>
            }
          </article>
        }
      </div>
    }
  `,
  styles: `
    .composer {
      display: flex;
      gap: var(--space-md);
      padding: var(--space-lg);
      margin-bottom: var(--space-xl);
      max-width: 720px;
      align-items: flex-end;

      textarea {
        flex: 1;
        resize: vertical;
        min-height: 60px;
      }
    }

    .feed-grid {
      display: grid;
      gap: var(--space-lg);
      max-width: 720px;
    }

    .feed-card {
      padding: var(--space-lg);
    }

    .feed-card__header {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      margin-bottom: var(--space-md);
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-full);
      background: var(--color-accent-soft);
      color: var(--color-accent);
      display: grid;
      place-items: center;
      font-weight: 700;
      font-size: 0.875rem;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .author {
      margin: 0;
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .time {
      margin: 0;
      font-size: 0.75rem;
      color: var(--color-text-muted);
    }

    .badge {
      margin-left: auto;
      padding: 0.25rem 0.625rem;
      border-radius: var(--radius-full);
      background: var(--color-primary-soft);
      color: var(--color-primary);
      font-size: 0.6875rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    .body {
      margin: 0 0 var(--space-md);
      color: var(--color-text-secondary);
      line-height: 1.5;
    }

    .game-chip {
      display: inline-block;
      padding: 0.375rem 0.75rem;
      border-radius: var(--radius-sm);
      background: var(--color-surface-elevated);
      font-size: 0.8125rem;
      font-weight: 600;
      margin-bottom: var(--space-md);
    }

    .feed-card__footer {
      display: flex;
      gap: var(--space-lg);
    }

    .action-btn {
      border: none;
      background: transparent;
      font-size: 0.875rem;
      color: var(--color-text-muted);
      font-weight: 600;

      &.liked {
        color: var(--color-danger);
      }
    }

    .comments {
      margin-top: var(--space-md);
      padding-top: var(--space-md);
      border-top: 1px solid var(--color-border);
    }

    .comment-form {
      display: flex;
      gap: var(--space-sm);
    }
  `,
})
export class HomePageComponent implements OnInit {
  private readonly social = inject(SocialApiService);
  private readonly fb = inject(FormBuilder);

  readonly loading = signal(true);
  readonly posting = signal(false);
  readonly posts = signal<FeedPost[]>([]);
  readonly expandedComments = signal<string | null>(null);

  readonly composeForm = this.fb.group({ body: [''] });

  ngOnInit(): void {
    this.loadFeed();
  }

  loadFeed(): void {
    this.social.getFeed().subscribe({
      next: (feed) => {
        this.posts.set(feed);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  createPost(): void {
    const body = this.composeForm.value.body?.trim();
    if (!body) return;
    this.posting.set(true);
    this.social.createPost({ type: 'text', body }).subscribe({
      next: (post) => {
        this.posts.update((list) => [post, ...list]);
        this.composeForm.reset();
        this.posting.set(false);
      },
      error: () => this.posting.set(false),
    });
  }

  toggleLike(post: FeedPost): void {
    this.social.likePost(post.id).subscribe({
      next: ({ liked }) => {
        this.posts.update((list) =>
          list.map((p) =>
            p.id === post.id
              ? {
                  ...p,
                  liked_by_me: liked,
                  like_count: liked ? p.like_count + 1 : Math.max(0, p.like_count - 1),
                }
              : p,
          ),
        );
      },
    });
  }

  toggleComments(postId: string): void {
    this.expandedComments.update((id) => (id === postId ? null : postId));
  }

  addComment(postId: string, body: string): void {
    if (!body.trim()) return;
    this.social.commentOnPost(postId, { body: body.trim() }).subscribe({
      next: () => {
        this.posts.update((list) =>
          list.map((p) =>
            p.id === postId ? { ...p, comment_count: p.comment_count + 1 } : p,
          ),
        );
      },
    });
  }

  initials(post: FeedPost): string {
    const name = post.author_display_name ?? post.author_username;
    return name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  formatTime(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return new Date(iso).toLocaleDateString();
  }
}
