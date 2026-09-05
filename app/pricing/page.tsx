import type { Metadata } from "next";

import { GetStarted } from "@/components/sections/get-started";
import { Faq } from "@/components/sections/faq";
import { PricingTable } from "@/components/sections/pricing-table";
import { PageHeader } from "@/components/ui/page-header";
import { Container, Section } from "@/components/ui/section";
import { pricingFaqs } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Flat monthly pricing with unlimited cards on every plan. Start with a seven-day trial or talk to us about multi-entity setups.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="One flat price. Unlimited cards."
        description="No per-card fees, no interchange games, no surprise line items at renewal. Pick the plan that matches how your team spends."
      />

      <Section className="pt-0">
        <Container>
          <PricingTable />
        </Container>
      </Section>

      <Faq
        items={pricingFaqs}
        eyebrow="Pricing questions"
        title="The things people ask before they sign"
      />

      <GetStarted />
    </>
  );
}
