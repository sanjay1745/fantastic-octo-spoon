import Amenities from '../sections/Amenities'
import Coaching from '../sections/Coaching'
import FinalCta from '../sections/FinalCta'
import Hero from '../sections/Hero'
import HomeFaq from '../sections/HomeFaq'
import MembershipsPreview from '../sections/MembershipsPreview'
import Results from '../sections/Results'
import Statement from '../sections/Statement'
import Stats from '../sections/Stats'
import Visit from '../sections/Visit'

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Amenities />
      <Coaching />
      <Stats />
      <MembershipsPreview />
      <Results />
      <Visit />
      <HomeFaq />
      <FinalCta />
    </>
  )
}
