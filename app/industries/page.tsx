import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Industries NIKZ Media works with: startups, SMEs, real estate, education, hospitality, retail, and personal brands in Kerala and beyond.",
  alternates: { canonical: "/industries" },
};

const colors = [
  "#0042FF",
  "#FF4D3A",
  "#12B886",
  "#F59F00",
  "#7C3AED",
  "#0CA678",
  "#E64980",
];

export default function IndustriesPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Industries</p>
          <h1 className="page-title">Who the work is for.</h1>
          <p className="band-copy">
            Seven kinds of business. The support copy is grounded in the
            services we actually offer, not invented case studies.
          </p>
        </div>
      </section>
      <section className="band band-cream">
        <div className="wrap industry-grid">
          {industries.map((item, index) => (
            <article className="industry-chip" key={item.name}>
              <span
                className="dot"
                style={{ background: colors[index % colors.length] }}
                aria-hidden="true"
              />
              <span>
                <h3>{item.name}</h3>
                <p>{item.support}</p>
              </span>
            </article>
          ))}
        </div>
        <div className="wrap" style={{ marginTop: 36 }}>
          <Link className="btn" href="/contact">
            Start a project
          </Link>
        </div>
      </section>
    </div>
  );
}
