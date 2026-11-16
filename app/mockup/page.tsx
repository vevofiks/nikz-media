import Link from "next/link";

export default function MockupPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Layout study</p>
          <h1 className="page-title">Direction locked.</h1>
          <p className="band-copy">
            The live site now uses the agency band system: blue and cream
            sections, condensed display type, and React Bits motion.
          </p>
          <div className="hero-actions">
            <Link className="btn" href="/">
              Open the site
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
