import type { Metadata } from "next";
import { agency } from "@/lib/content";
import { ContactView } from "@/components/contact-view";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${agency.name} in ${agency.city}. Email, WhatsApp, phone, or the inquiry form for digital marketing, content, and websites.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactView />;
}
