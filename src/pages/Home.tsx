import Amenities from '../sections/Amenities'
import Coaching from '../sections/Coaching'
import FinalCta from '../sections/FinalCta'
import GoogleReviews from '../sections/GoogleReviews'
import Hero from '../sections/Hero'
import HomeFaq from '../sections/HomeFaq'
import MembershipsPreview from '../sections/MembershipsPreview'
import Results from '../sections/Results'
import Statement from '../sections/Statement'
import Visit from '../sections/Visit'

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Amenities />
      <MembershipsPreview />
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
