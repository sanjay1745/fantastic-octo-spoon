import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'
import { isExternal } from '../lib/url'

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
  children: ReactNode
}

/** Internal paths use the router; external URLs open in a new tab with an accessible hint. */
export default function SmartLink({ href, children, ...rest }: Props) {
  if (isExternal(href)) {
    const newTab = href.startsWith('http')
    return (
      <a href={href} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
        {newTab && <span className="visually-hidden"> (opens in a new tab)</span>}
      </a>
    )
  }
  return (
    <Link to={href} {...rest}>
      {children}
    </Link>
  )
}
