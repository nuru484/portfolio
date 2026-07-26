// src/components/legal/TermsOfService.tsx
// The terms of service copy for a personal portfolio: light on ceremony,
// clear about ownership, linked demos, and the as-is nature of the writing.
import { CONTACT } from '@/config/constants';
import {
  LegalDoc,
  LegalSection,
  LegalText,
  LegalList,
  LegalLink,
} from '@/components/legal/LegalDoc';

export function TermsOfService() {
  return (
    <LegalDoc
      title="Terms of Service"
      lastUpdated="July 26, 2026"
      crossLink={{ href: '/privacy-policy', label: 'Privacy Policy' }}
    >
      <LegalSection title="1. Acceptance of terms">
        <LegalText>
          By using this website you agree to these Terms of Service. If you do
          not agree, do not use the site.
        </LegalText>
      </LegalSection>

      <LegalSection title="2. About this site">
        <LegalText>
          This is the personal portfolio and blog of Abdul-Majeed Nurudeen, a
          full-stack software engineer. It showcases projects I have built,
          hosts my technical writing, and gives prospective clients and
          employers a way to reach me. It sells nothing and requires no
          account.
        </LegalText>
      </LegalSection>

      <LegalSection title="3. Intellectual property">
        <LegalText>
          The content of this site (writing, case studies, images, and design)
          belongs to me. You may quote or share it with attribution and a
          link. Many of the projects showcased here are open source on{' '}
          <LegalLink href="https://github.com/nuru484" external>
            GitHub
          </LegalLink>{' '}
          under their own licenses, which govern the code itself.
        </LegalText>
      </LegalSection>

      <LegalSection title="4. Blog content is provided as-is">
        <LegalText>
          Articles here are technical writing and opinion, offered in good
          faith but without any guarantee of accuracy, completeness, or
          fitness for your situation. If you apply something you read here to
          your own systems, you do so at your own risk.
        </LegalText>
      </LegalSection>

      <LegalSection title="5. Linked demos and external sites">
        <LegalText>
          Project pages link to live demonstration applications and other
          external sites. Each demo has its own terms and privacy policy,
          which apply when you use it, and I am not responsible for the
          content or practices of external sites I link to.
        </LegalText>
      </LegalSection>

      <LegalSection title="6. Acceptable use">
        <LegalText>You agree not to:</LegalText>
        <LegalList
          items={[
            'use the contact form to send spam, unlawful content, or bulk unsolicited messages;',
            'attempt to access the admin area or any non-public part of the site;',
            'disrupt the site or subject it to automated load;',
            'misrepresent this site or its content as your own.',
          ]}
        />
      </LegalSection>

      <LegalSection title="7. Disclaimer of warranties">
        <LegalText>
          The site is provided &quot;as is&quot; and &quot;as available&quot;,
          without warranties of any kind, express or implied.
        </LegalText>
      </LegalSection>

      <LegalSection title="8. Limitation of liability">
        <LegalText>
          To the maximum extent permitted by law, I am not liable for any
          indirect, incidental, or consequential damages arising from your use
          of this site or reliance on its content.
        </LegalText>
      </LegalSection>

      <LegalSection title="9. Changes to these terms">
        <LegalText>
          These Terms may be revised at any time; the date at the top reflects
          the latest version. Continued use after a change means you accept
          the revised Terms.
        </LegalText>
      </LegalSection>

      <LegalSection title="10. Governing law">
        <LegalText>
          These Terms are governed by the laws of the Republic of Ghana.
        </LegalText>
      </LegalSection>

      <LegalSection title="11. Contact">
        <LegalText>
          Questions about these Terms:{' '}
          <LegalLink href={`mailto:${CONTACT.email}`} external>
            {CONTACT.email}
          </LegalLink>
          .
        </LegalText>
      </LegalSection>
    </LegalDoc>
  );
}
