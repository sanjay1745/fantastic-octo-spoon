import Button from '../components/Button'
import PageHero from '../components/PageHero'
import { joinHref, tourHref } from '../lib/cta'

/** Temporary inner page, replaced page by page after the Home page review. */
export default function Stub({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <PageHero eyebrow={eyebrow} title={title} lead="This page is being built. In the meantime, come see the gym in person.">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <Button href={tourHref} variant="light" arrow>
          Book a free tour
        </Button>
        <Button href={joinHref} variant="primary">
          Join Now
        </Button>
      </div>
    </PageHero>
  )
}
