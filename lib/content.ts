import site from "@/data/site.json";
import type { ServiceGroup, ServiceItem, SiteContent } from "@/lib/site-types";

const data = site as SiteContent;

export type { ServiceGroup, ServiceItem };

export const agency = data.agency;
export const aboutCopy = data.aboutCopy;
export const serviceGroups = data.serviceGroups;
export const industries = data.industries;
export const values = data.values;
export const approach = data.approach;
export const workSlots = data.workSlots;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact Us" },
] as const;

export const serviceOptions = serviceGroups.flatMap((group) =>
  group.items.map((item) => item.name),
);

export function inquiryHref(service?: string) {
  if (!service) return "/contact";
  return `/contact?service=${encodeURIComponent(service)}`;
}

export const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  "Pottananickal Building, Opposite SH Medical Centre Hospital, Nagampadom P.O., Kottayam, Kerala 686001, India",
)}&z=16&output=embed`;

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    agency.siteUrl.replace(/\/$/, "") ||
    "https://nikzmedia.com"
  );
}
