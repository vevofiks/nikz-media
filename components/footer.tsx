import Link from "next/link";
import { agency, nav } from "@/lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="kicker">{agency.tagline}</p>
          <h2>NIKZ Media</h2>
          <p>
            {agency.positioning}. Studio in {agency.city}.
          </p>
        </div>
        <div>
          <p className="footer-label">Visit</p>
          <address>{agency.address}</address>
        </div>
        <div>
          <p className="footer-label">Speak</p>
          <ul>
            <li>
              <a href={`mailto:${agency.email}`}>{agency.email}</a>
            </li>
            <li>
              <a href={`tel:${agency.phoneTel}`}>{agency.phoneDisplay}</a>
            </li>
            <li>
              <a href={agency.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-label">Pages</p>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <span>© 2026 NIKZ Media</span>
        <span>Kottayam, Kerala</span>
      </div>
    </footer>
  );
}
