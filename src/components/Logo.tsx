import emblem from '../assets/brand/emblem.svg?raw'
import icon from '../assets/brand/icon.svg?raw'
import wordmark from '../assets/brand/wordmark.svg?raw'
import { site } from '../data/site'

// Official logo artwork (extracted from the source .ai files), inlined so it paints instantly
// and inherits `color`. Never redraw or retype the logo.
const decorative = (svg: string) => svg.replace(/ role="img" aria-label="[^"]*"/, ' aria-hidden="true" focusable="false"')
const svgs = { wordmark: decorative(wordmark), icon: decorative(icon), emblem: decorative(emblem) }

interface Props {
  variant: keyof typeof svgs
  className?: string
  /** Set false when the logo sits inside a link that already has an accessible name */
  label?: boolean
}

export default function Logo({ variant, className, label = true }: Props) {
  return (
    <span
      className={className}
      style={{ display: 'block', lineHeight: 0 }}
      {...(label ? { role: 'img', 'aria-label': site.name } : { 'aria-hidden': true })}
      dangerouslySetInnerHTML={{ __html: svgs[variant] }}
    />
  )
}
