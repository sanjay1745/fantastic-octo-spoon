import Button from '../components/Button'
import PageHero from '../components/PageHero'

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="This page doesn't exist." lead="The link may be old or mistyped.">
      <Button href="/" variant="light" arrow>
        Back to home
      </Button>
    </PageHero>
  )
}
