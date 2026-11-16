import { agency, getSiteUrl } from "@/lib/content";

export function JsonLd() {
  const url = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: agency.name,
    description: agency.positioning,
    url,
    email: agency.email,
    telephone: agency.phoneTel,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Pottananickal Building, Opposite SH Medical Centre Hospital, Nagampadom P.O.",
      addressLocality: "Kottayam",
      addressRegion: "Kerala",
      postalCode: "686001",
      addressCountry: "IN",
    },
    areaServed: "IN",
    sameAs: [agency.whatsapp],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
