import { primaryLocation } from './locations'
import { site } from './site'

/**
 * Privacy policy content. Keep it true to what the site actually does:
 * update it whenever tracking or third-party services change (e.g. adding the Meta Pixel).
 * TODO(owner): have this reviewed by legal counsel, and confirm the legal business name.
 */
export interface PolicySection {
  id: string
  title: string
  /** Paragraphs, shown in order */
  body?: string[]
  /** Bullet list shown after the paragraphs */
  list?: { label?: string; text: string }[]
  /** Paragraphs shown after the list */
  after?: string[]
}

export const privacy = {
  /** Shown on the page as "Effective <date>" */
  effective: 'November 15, 2026',
  intro: `This policy explains what information the ${site.name} website collects, how we use it, and the choices you have. It covers this website only. Memberships, bookings, payments and store orders are handled by the outside services listed below, which have their own privacy policies.`,
  sections: [
    {
      id: 'collect',
      title: 'Information we collect',
      list: [
        {
          label: 'Information you send us.',
          text: 'If you email or call us, we receive what you choose to share, such as your name, email address, phone number and message.',
        },
        {
          label: 'Usage information.',
          text: 'We use Google Analytics to see how the site is used: which pages are viewed, which buttons and links are clicked, the general area you are visiting from (city level), your device and browser type, and the site or ad that brought you here. Google Analytics uses cookies to do this. We do not use it to identify you personally.',
        },
        {
          label: 'Hosting logs.',
          text: 'Our hosting provider (GitHub) may log technical details such as IP addresses to keep the service secure.',
        },
      ],
      after: ['We do not collect payment information on this website.'],
    },
    {
      id: 'use',
      title: 'How we use information',
      list: [
        { text: 'To understand how the site is used and improve it.' },
        { text: 'To measure how well our advertising works.' },
        { text: 'To respond when you contact us.' },
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies and analytics',
      body: [
        'Google Analytics sets cookies in your browser so it can tell visits apart. You can block or delete cookies in your browser settings, or install Google’s Analytics Opt-out Browser Add-on.',
        'If your browser sends a Global Privacy Control signal, we do not load Google Analytics for your visit.',
      ],
    },
    {
      id: 'third-parties',
      title: 'Services run by others',
      body: ['Some parts of the site are provided by other companies. When you use them, they receive information directly from you or your browser, and their own privacy policies apply.'],
      list: [
        { label: 'Tour bookings:', text: 'ClubLifePro.' },
        { label: 'Coaching consultation form:', text: 'Typeform.' },
        { label: 'Membership sign-up and payments:', text: 'Peak Payment.' },
        { label: 'Apparel store:', text: 'Shopify, at stoikathletix.com.' },
        { label: 'Map and reviews:', text: 'Google Maps. The embedded map and Google reviews load from Google, which receives your IP address.' },
        { label: 'Social media:', text: 'Links to Instagram and TikTok open those services.' },
      ],
    },
    {
      id: 'sharing',
      title: 'How we share information',
      body: [
        'We do not sell your personal information. We share information only with the service providers described above, or when the law requires it.',
      ],
    },
    {
      id: 'rights',
      title: 'Your choices and California privacy rights',
      body: [
        'If you are a California resident, you can ask us what personal information we have about you, ask us to correct or delete it, and opt out of any sale or sharing of it. We will not treat you differently for making a request.',
        `To make a request, email ${site.email}.`,
      ],
    },
    {
      id: 'retention',
      title: 'How long we keep information',
      body: ['We keep information only as long as we need it for the purposes above. Messages you send us are kept as long as needed to help you and maintain our records.'],
    },
    {
      id: 'children',
      title: 'Children',
      body: [`${site.name} is an 18+ gym. This website is not directed to children under 13, and we do not knowingly collect personal information from them.`],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      body: ['If we change this policy, we will post the new version here and update the effective date above.'],
    },
  ] as PolicySection[],
  contact: {
    title: 'Contact us',
    lead: 'Questions about this policy or your information:',
    email: site.email,
    phone: primaryLocation.phone,
    address: `${primaryLocation.address.street}, ${primaryLocation.address.city}, ${primaryLocation.address.region} ${primaryLocation.address.postalCode}`,
  },
}
