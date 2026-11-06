import ScrollRevealText from '../components/ScrollRevealText'
import { Eyebrow } from '../components/SectionHeader'
import styles from './Statement.module.css'

const STATEMENT =
  'Stoik Gym is built for people who show up. Who train with intent, recover with purpose and hold themselves to a higher standard. No shortcuts. No noise. Just the work, the coaching and a community that expects your best.'

export default function Statement() {
  return (
    <section className={`section ${styles.statement}`} aria-label="Our standard">
      <div className="container">
        <Eyebrow>The standard</Eyebrow>
        <ScrollRevealText text={STATEMENT} emphasis={['standard', 'community']} className={styles.text} />
      </div>
    </section>
  )
}
