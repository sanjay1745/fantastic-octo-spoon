import { coaches } from './coaches'
import { primaryLocation } from './locations'

/**
 * Stats strip. Only real numbers here.
 * TODO(owner): add member count and year opened when available.
 */
export interface Stat {
  value: string
  label: string
}

export const stats: Stat[] = [
  { value: '4x', label: "Men's Physique Olympia titles held by our founder" },
  { value: String(coaches.length), label: 'Coaches on the team' },
  { value: (primaryLocation.sizeSqFt ?? 0).toLocaleString('en-US'), label: 'Square feet in Roseville' },
  { value: '60+', label: 'Pieces of Skelcore equipment' },
]
