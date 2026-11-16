import type { Metadata } from "next";
import { agency } from "@/lib/content";
import { AboutView } from "@/components/about-view";

export const metadata: Metadata = {
  title: "About",
  description: `About ${agency.name}, a creative digital marketing agency in ${agency.city}. Mission, values, and how the work moves.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutView />;
}
