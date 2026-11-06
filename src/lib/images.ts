import { MEDIA_WIDTHS } from '../data/media'
import { asset } from './url'

/** srcset for a generated media slot, e.g. srcSet('media/equipment', 'avif') */
export function srcSet(base: string, ext: 'avif' | 'webp'): string {
  return MEDIA_WIDTHS.map((w) => `${asset(`${base}-${w}.${ext}`)} ${w}w`).join(', ')
}
