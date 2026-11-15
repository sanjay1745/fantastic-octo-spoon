import PageHero from '../components/PageHero'
import { telHref } from '../data/locations'
import { privacy } from '../data/privacy'
import styles from './Privacy.module.css'

/** Privacy policy. Content lives in src/data/privacy.ts. */
export default function Privacy() {
  const { contact } = privacy
  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacy policy." lead={`Effective ${privacy.effective}`} />

      <section className={`section ${styles.section}`} aria-label="Privacy policy">
        <div className="container">
          <div className={styles.prose}>
            <p className={styles.intro}>{privacy.intro}</p>

            {privacy.sections.map((s) => (
              <section key={s.id} aria-labelledby={`privacy-${s.id}`} className={styles.block}>
                <h2 id={`privacy-${s.id}`} className={styles.heading}>
                  {s.title}
                </h2>
                {s.body?.map((p, i) => <p key={i}>{p}</p>)}
                {s.list && (
                  <ul className={styles.list}>
                    {s.list.map((item, i) => (
                      <li key={i}>
                        {item.label && <strong>{item.label} </strong>}
                        {item.text}
                      </li>
                    ))}
                  </ul>
                )}
                {s.after?.map((p, i) => <p key={i}>{p}</p>)}
              </section>
            ))}

            <section aria-labelledby="privacy-contact" className={styles.block}>
              <h2 id="privacy-contact" className={styles.heading}>
                {contact.title}
              </h2>
              <p>{contact.lead}</p>
              <address className={styles.contact}>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <a href={telHref(contact.phone)}>{contact.phone}</a>
                <span>{contact.address}</span>
              </address>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}
