import type { Metadata } from "next";

import { ContactForm } from "@/components/sections/contact-form";
import { PageHeader } from "@/components/ui/page-header";
import { Container, Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a demo of Ballance or talk to the team about multi-entity setups.",
  alternates: { canonical: "/contact" },
};

const DETAILS = [
  { label: "Sales", value: "sales@ballance.example", href: "mailto:sales@ballance.example" },
  { label: "Support", value: "help@ballance.example", href: "mailto:help@ballance.example" },
  { label: "Press", value: "press@ballance.example", href: "mailto:press@ballance.example" },
] as const;

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  // The home-page CTA is a plain GET form that hands the address over here.
  const { email } = await searchParams;
  const prefilledEmail = typeof email === "string" ? email : "";

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to someone who has done the close"
        description="Every demo is run by someone who has actually closed a set of books. Twenty minutes, your numbers, a straight answer."
      />

      <Section className="bg-white">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          <ContactForm defaultEmail={prefilledEmail} />

          <aside className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <h2 className="label text-ink/45">Direct lines</h2>
              <ul className="flex flex-col divide-y divide-ink/10 border-y border-ink/10">
                {DETAILS.map((detail) => (
                  <li key={detail.label} className="flex items-center justify-between gap-4 py-4">
                    <span className="text-sm text-ink/55">{detail.label}</span>
                    <a
                      href={detail.href}
                      className="text-sm font-medium underline-offset-4 hover:underline"
                    >
                      {detail.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 rounded-card bg-cream p-7">
              <h2 className="font-medium tracking-tight">London</h2>
              <p className="text-sm leading-relaxed text-ink/55">
                12 Rivington Street
                <br />
                London EC2A 3DU
                <br />
                United Kingdom
              </p>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
