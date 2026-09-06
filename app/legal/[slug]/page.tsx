import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/ui/page-header";
import { Container, Section } from "@/components/ui/section";
import { getLegalDocument, legalDocuments } from "@/content/legal";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return legalDocuments.map((document) => ({ slug: document.slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const document = getLegalDocument(slug);

  return document ? { title: document.title, description: document.summary } : {};
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const document = getLegalDocument(slug);

  if (!document) notFound();

  return (
    <>
      <PageHeader eyebrow="Legal" title={document.title} description={document.summary} />

      <Section className="pt-0">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col gap-10">
            <p className="label text-ink/60">
              Last updated {formatDate(document.updatedAt)}
            </p>

            {document.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-3 border-t border-ink/10 pt-8">
                <h2 className="text-xl font-bold tracking-tight">{section.heading}</h2>
                <p className="leading-relaxed text-ink/65 text-pretty">{section.body}</p>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
