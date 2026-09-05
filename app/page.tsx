import { BuiltFor } from "@/components/sections/built-for";
import { Capabilities } from "@/components/sections/capabilities";
import { Compliance } from "@/components/sections/compliance";
import { Faq } from "@/components/sections/faq";
import { GetStarted } from "@/components/sections/get-started";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Stories } from "@/components/sections/stories";
import {
  JsonLd,
  faqSchema,
  organizationSchema,
  websiteSchema,
} from "@/components/seo/json-ld";
import { faqs } from "@/content/home";

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchema} />

      {/* Stats render inside the hero's fade, overlapping the dissolving image. */}
      <Hero>
        <Stats />
      </Hero>
      <Capabilities />
      <BuiltFor />
      <Stories />
      <Compliance />
      <Faq items={faqs} />
      <GetStarted />
    </>
  );
}
