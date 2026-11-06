import type { Location } from '../data/locations'
import Stub from './Stub'

/** One page per location, generated from src/data/locations.ts. Full layout comes after the Home review. */
export default function LocationDetail({ location }: { location: Location }) {
  return <Stub eyebrow={`Locations · ${location.name}`} title={location.status === 'open' ? `${location.name}.` : `${location.name}. Coming soon.`} />
}
