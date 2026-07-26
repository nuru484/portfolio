// src/components/legal/PrivacyPolicy.tsx
// The privacy policy copy. Every claim mirrors how the site actually works:
// contact submissions are emailed and never stored in a database, analytics
// is GA4 only, YouTube embeds use the no-cookie domain. If those change,
// this document must change with them.
import { CONTACT } from '@/config/constants';
import {
  LegalDoc,
  LegalSection,
  LegalText,
  LegalList,
  LegalStrong,
  LegalLink,
} from '@/components/legal/LegalDoc';

export function PrivacyPolicy() {
  return (
    <LegalDoc
      title="Privacy Policy"
      lastUpdated="July 26, 2026"
      crossLink={{ href: '/terms-of-service', label: 'Terms of Service' }}
    >
      <LegalSection title="1. Introduction">
        <LegalText>
          This is the personal portfolio site of Abdul-Majeed Nurudeen, a
          full-stack software engineer. It exists to showcase my work and
          writing, and it collects very little about you. This policy explains
          exactly what that is, why, and what your choices are.
        </LegalText>
      </LegalSection>

      <LegalSection title="2. Who I am">
        <LegalText>
          The site is owned and operated by me personally. For anything in
          this policy, contact{' '}
          <LegalLink href={`mailto:${CONTACT.email}`} external>
            {CONTACT.email}
          </LegalLink>
          .
        </LegalText>
      </LegalSection>

      <LegalSection title="3. The contact form">
        <LegalText>
          If you use the contact form, you send me your name, email address,
          message, and optionally a phone number, company details, budget, and
          timeline. Submissions are delivered to me by email (with a
          confirmation copy to you) and are{' '}
          <LegalStrong>never stored in a database</LegalStrong>; they live only
          as ordinary email correspondence. I use them for exactly one thing:
          responding to your inquiry. Email me if you want a past conversation
          deleted.
        </LegalText>
      </LegalSection>

      <LegalSection title="4. Analytics">
        <LegalText>
          The site uses Google Analytics 4 to understand aggregate traffic:
          which pages are visited, roughly where from, and on what kind of
          device. Google sets its own cookies (the <code>_ga</code> family)
          and processes visit data, including IP addresses, on my behalf under{' '}
          <LegalLink href="https://policies.google.com/privacy" external>
            Google&apos;s privacy policy
          </LegalLink>
          . I only ever see aggregated statistics, and I use them for nothing
          beyond understanding how the site is doing. You can block these
          cookies in your browser or use{' '}
          <LegalLink href="https://tools.google.com/dlpage/gaoptout" external>
            Google&apos;s opt-out add-on
          </LegalLink>{' '}
          and the site works exactly the same.
        </LegalText>
      </LegalSection>

      <LegalSection title="5. Technical data">
        <LegalText>
          Like any website, the server briefly processes your IP address to
          deliver pages and to rate-limit the contact form and the admin area
          against abuse. This is transient protection data, not tracking, and
          it is not used to identify you.
        </LegalText>
      </LegalSection>

      <LegalSection title="6. Embedded content and providers">
        <LegalList
          items={[
            <>
              <LegalStrong>YouTube:</LegalStrong> project pages may embed demo
              videos using YouTube&apos;s privacy-enhanced no-cookie mode,
              which sets no tracking cookies unless you press play. Once you
              play a video, YouTube&apos;s own terms apply.
            </>,
            <>
              <LegalStrong>Cloudinary:</LegalStrong> images on the site are
              served from the Cloudinary CDN.
            </>,
            <>
              <LegalStrong>Hosting and email:</LegalStrong> the site runs on
              ordinary cloud hosting, and contact-form email is delivered
              through a standard email provider.
            </>,
          ]}
        />
        <LegalText>
          These providers process data only to serve the site; nobody receives
          your data for their own marketing purposes, and nothing is ever
          sold.
        </LegalText>
      </LegalSection>

      <LegalSection title="7. Cookies and local storage">
        <LegalText>
          The only cookies for visitors are the Google Analytics cookies
          described above. Your light/dark theme preference is stored in your
          own browser&apos;s local storage and never leaves it. The admin
          sign-in cookie exists solely for me, the site owner, to manage
          content.
        </LegalText>
      </LegalSection>

      <LegalSection title="8. Your rights">
        <LegalText>
          The only personal data I hold about visitors is contact-form
          correspondence in my mailbox. Email me at{' '}
          <LegalLink href={`mailto:${CONTACT.email}`} external>
            {CONTACT.email}
          </LegalLink>{' '}
          to have it deleted, corrected, or re-sent to you, and I will do it.
        </LegalText>
      </LegalSection>

      <LegalSection title="9. Children">
        <LegalText>
          This site is not directed at children, and I do not knowingly
          collect data from minors.
        </LegalText>
      </LegalSection>

      <LegalSection title="10. Changes to this policy">
        <LegalText>
          If how the site handles data changes, this document will be updated
          with a new date at the top.
        </LegalText>
      </LegalSection>
    </LegalDoc>
  );
}
