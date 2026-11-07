import { type ReactNode, useId, useRef } from 'react'
import { coachedBy, hasPhotos, type Testimonial } from '../data/testimonials'
import Media from './Media'
import styles from './TestimonialCard.module.css'

/** Wraps each highlight phrase found in `text` in <strong>. Phrases not found are ignored. */
function emphasize(text: string, highlights: string[] = []): ReactNode {
  const found = highlights.filter((h) => h && text.includes(h))
  if (!found.length) return text
  const escaped = found.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  return text.split(new RegExp(`(${escaped.join('|')})`)).map((part, i) =>
    found.includes(part) ? (
      <strong key={i} className={styles.hl}>
        {part}
      </strong>
    ) : (
      part
    ),
  )
}

/**
 * A client story: before/after (once photos exist), pull quote and name.
 * "Read full story" opens the whole testimonial in a modal dialog, so cards in a row keep their size.
 * The full text is in the HTML from the start (good for search), just hidden until opened.
 */
export default function TestimonialCard({ t }: { t: Testimonial }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const hasMore = t.story.length > 1 || t.story[0] !== t.excerpt

  return (
    <figure className={styles.card}>
      {hasPhotos(t) && (
        <div className={styles.pair}>
          <div className={styles.shot}>
            <Media slot={t.before} sizes="(min-width: 900px) 15vw, 40vw" />
            <span className={styles.tag}>Before</span>
          </div>
          <div className={styles.shot}>
            <Media slot={t.after} sizes="(min-width: 900px) 15vw, 40vw" />
            <span className={styles.tag}>After</span>
          </div>
        </div>
      )}

      <blockquote className={styles.quote}>
        <p>“{emphasize(t.excerpt, t.highlights)}”</p>
      </blockquote>

      {hasMore && (
        <>
          <button type="button" className={styles.more} aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>
            Read full story<span className="visually-hidden"> from {t.name}</span>
          </button>
          <dialog
            ref={dialog}
            className={styles.dialog}
            aria-labelledby={titleId}
            // A click on the dialog element itself (the backdrop area, outside the panel) closes it
            onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
          >
            <div className={styles.panel}>
              <div className={styles.dialogHead}>
                <div>
                  <p id={titleId} className={styles.dialogName}>
                    {t.name}
                  </p>
                  <p className={styles.detail}>
                    {t.program} · {coachedBy(t)}
                  </p>
                </div>
                <button type="button" className={styles.close} onClick={() => dialog.current?.close()} aria-label="Close">
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3.5 3.5l9 9m0-9l-9 9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className={styles.story}>
                {t.story.map((p, i) => (
                  <p key={i}>{emphasize(p, t.highlights)}</p>
                ))}
              </div>
            </div>
          </dialog>
        </>
      )}

      <figcaption className={styles.caption}>
        <span className={styles.name}>{t.name}</span>
        <span className={styles.detail}>{t.program}</span>
        <span className={styles.detail}>{coachedBy(t)}</span>
      </figcaption>
    </figure>
  )
}
