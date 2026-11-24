import Button from '../components/Button'
import { season } from '../data/season'
import Amenities from '../sections/Amenities'
import Coaching from '../sections/Coaching'
import FinalCta from '../sections/FinalCta'
import Gifts from '../sections/Gifts'
import GoogleReviews from '../sections/GoogleReviews'
import Hero from '../sections/Hero'
import heroStyles from '../sections/Hero.module.css'
import HomeFaq from '../sections/HomeFaq'
import MembershipsPreview from '../sections/MembershipsPreview'
import Results from '../sections/Results'
import Statement from '../sections/Statement'
import Visit from '../sections/Visit'

/** "Black Friday." → "Black <silver>Friday.</silver>" */
function accentLast(title: string) {
  const i = title.lastIndexOf(' ')
  if (i < 0) return <span className={heroStyles.accent}>{title}</span>
  return (
    <>
      {title.slice(0, i)} <span className={heroStyles.accent}>{title.slice(i + 1)}</span>
    </>
  )
}

/** Home hero: the everyday "Be Stoik." hero, or the active season's (src/data/season.ts). */
function HomeHero() {
  if (!season) return <Hero />
  const { hero } = season
  return (
    <Hero
      season={season.id}
      eyebrow={hero.eyebrow}
      title={accentLast(hero.title)}
      lead={hero.lead}
      actions={
        <>
          <Button href={hero.primary.href} variant={season.id === 'black-friday' ? 'primary' : 'light'} size="lg" arrow>
            {hero.primary.label}
          </Button>
          <Button href={hero.secondary.href} variant="ghost" size="lg">
            {hero.secondary.label}
          </Button>
        </>
      }
    />
  )
}

export default function Home() {
  return (
    <>
      <HomeHero />
      <Statement />
      <Amenities />
      <MembershipsPreview />
      {season?.gifts && <Gifts />}
      <Coaching />
      {/* Stats strip (src/sections/Stats.tsx) is hidden for now; re-add <Stats /> here to bring it back */}
      <Results />
      <Visit />
      <GoogleReviews />
      <HomeFaq />
      <FinalCta />
    </>
  )
}
