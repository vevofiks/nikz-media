import type { Metadata } from "next";
import Link from "next/link";
import { workSlots } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected NIKZ Media case studies: digital marketing, content, websites, and brand strategy. New work is added as it can be shown.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Work</p>
          <h1 className="page-title">Selected studies, when they can be shown.</h1>
          <p className="band-copy">
            No project files are in the site archive yet. These frames are the
            structure those case studies will use.
          </p>
        </div>
      </section>
      <section className="band band-cream">
        <div className="wrap work-board">
          {workSlots.map((slot) => (
            <article className="slot" key={slot.index}>
              <div>
                <p className="kicker">Selected case study</p>
                <h3>Coming soon</h3>
                <p>{slot.discipline}</p>
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 48 }}>
                {slot.index}
              </p>
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
