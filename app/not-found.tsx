import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">404</p>
          <h1 className="page-title">This page is not here.</h1>
          <p className="band-copy">
            The link may be old, or the page has moved. Head home or open the
            contact form.
          </p>
          <div className="hero-actions">
            <Link className="btn" href="/">
              Back home
            </Link>
            <Link className="link-draw" href="/contact">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
