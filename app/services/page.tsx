import type { Metadata } from "next";
import { agency } from "@/lib/content";
import { ServicesView } from "@/components/services-view";

export const metadata: Metadata = {
  title: "Services",
  description: `Digital marketing, creative content, websites, and brand strategy from ${agency.name} in ${agency.city}. Ten services across three practices.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesView />;
}
