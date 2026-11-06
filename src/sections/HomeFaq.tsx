import Button from '../components/Button'
import FaqList from '../components/FaqList'
import SectionHeader from '../components/SectionHeader'
import { faqsFor } from '../data/faq'
import styles from './HomeFaq.module.css'

export default function HomeFaq() {
  return (
    <section className={`section ${styles.faq}`} aria-labelledby="faq-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.head}>
          <SectionHeader
            eyebrow="FAQ"
            id="faq-title"
            title="Questions, answered."
            lead="Anything else? Call, email or stop by the front desk."
            actions={
              <Button href="/contact" variant="ghost" size="sm" arrow>
                Contact us
              </Button>
            }
          />
        </div>
        <FaqList items={faqsFor('home')} />
      </div>
    </section>
  )
}
