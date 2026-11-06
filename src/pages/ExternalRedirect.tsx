import { useEffect } from 'react'
import PageHero from '../components/PageHero'

/**
 * Forwards to an external site. The pre-rendered HTML also carries a meta refresh
 * (see `redirect` in route meta), so this works before JS loads.
 */
export default function ExternalRedirect({ to, label }: { to: string; label: string }) {
  useEffect(() => {
    window.location.replace(to)
  }, [to])

  return (
    <PageHero eyebrow="Redirecting" title={`Taking you to ${label}.`}>
      <p className="muted">
        If nothing happens, <a href={to} style={{ textDecoration: 'underline' }}>continue to {to.replace(/^https?:\/\/|\/$/g, '')}</a>.
      </p>
    </PageHero>
  )
}
