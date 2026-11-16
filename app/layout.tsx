import type { Metadata, Viewport } from "next";
import { DM_Sans, Oswald } from "next/font/google";
import { Chrome } from "@/components/chrome";
import { JsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import { agency, getSiteUrl } from "@/lib/content";
import site from "@/data/site.json";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.seo.title,
    template: `%s | ${agency.name}`,
  },
  description: site.seo.description,
  applicationName: agency.name,
  keywords: [
    "digital marketing agency",
    "Kottayam",
    "Kerala",
    "social media marketing",
    "SEO",
    "Meta ads",
    "Google ads",
    "branding",
    "website design",
    "NIKZ Media",
  ],
  authors: [{ name: agency.name }],
  creator: agency.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: agency.name,
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0042FF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${oswald.variable} ${dmSans.variable}`}>
      <body>
        <JsonLd />
        <Providers>
          <Chrome>{children}</Chrome>
        </Providers>
      </body>
    </html>
  );
}
