"use client";

import { Suspense } from "react";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import AnimatedContent from "@/components/AnimatedContent";
import FadeContent from "@/components/FadeContent";
import ScrollReveal from "@/components/ScrollReveal";
import { InquiryForm } from "@/components/inquiry-form";
import { agency, mapSrc } from "@/lib/content";

const channels = [
  {
    label: "Email",
    value: agency.email,
    href: `mailto:${agency.email}`,
    icon: Mail,
    note: "Reach the studio directly",
  },
  {
    label: "Phone",
    value: agency.phoneDisplay,
    href: `tel:${agency.phoneTel}`,
    icon: Phone,
    note: "Call during studio hours",
  },
  {
    label: "WhatsApp",
    value: "Message on WhatsApp",
    href: agency.whatsapp,
    icon: MessageCircle,
    note: "Fast for short briefs",
    external: true,
  },
  {
    label: "Studio",
    value: agency.city,
    href: "#visit",
    icon: MapPin,
    note: "Kottayam, Kerala",
  },
] as const;

export function ContactView() {
  return (
    <div className="page contact-page">
      <section className="band band-cream contact-hero">
        <div className="wrap contact-hero-grid">
          <div className="contact-hero-copy">
            <p className="kicker">Contact</p>
            <FadeContent effect="focus" duration={0.8}>
              <h1 className="contact-hero-title">Tell us what should grow.</h1>
            </FadeContent>
            <FadeContent effect="focus" duration={0.75}>
              <p className="contact-hero-lede">
                Email, WhatsApp, or the inquiry form. Say which of the ten
                services you need, and what the business is trying to grow.
              </p>
            </FadeContent>
          </div>
          <FadeContent
            effect="develop"
            duration={0.9}
            className="contact-hero-media"
          >
            <img src="/photos/stream-work-06.jpg" alt="" />
          </FadeContent>
        </div>
      </section>

      <section className="band band-white">
        <div className="wrap">
          <div className="contact-section-head">
            <div>
              <p className="kicker">Reach us</p>
              <h2 className="band-title">Four ways in.</h2>
            </div>
            <p className="contact-section-note">
              Pick the channel that fits. The form stores the inquiry for the
              studio either way.
            </p>
          </div>

          <AnimatedContent
            distance={24}
            duration={0.65}
            stagger={0.08}
            className="contact-channels"
          >
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.label}
                  className="contact-channel"
                  href={channel.href}
                  {...("external" in channel && channel.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="contact-channel-icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <span className="contact-channel-label">{channel.label}</span>
                  <strong>{channel.value}</strong>
                  <p>{channel.note}</p>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              );
            })}
          </AnimatedContent>
        </div>
      </section>

      <section className="band band-cream" id="inquire">
        <div className="wrap contact-inquire">
          <div className="contact-inquire-copy">
            <p className="kicker">Inquiry</p>
            <ScrollReveal
              splitBy="words"
              effect="rise"
              mode="enter"
              enableBlur
              stagger={0.04}
              containerClassName="band-reveal"
              textClassName="contact-inquire-title"
            >
              Start with a short brief.
            </ScrollReveal>
            <p className="contact-inquire-lede">
              Name the service. Describe the business. We will point to the
              right starting set.
            </p>
            <FadeContent
              effect="develop"
              duration={0.85}
              className="contact-inquire-media"
            >
              <img src="/photos/design.jpg" alt="" />
            </FadeContent>
          </div>
          <div className="contact-inquire-form">
            <Suspense fallback={<p className="form-note">Loading form…</p>}>
              <InquiryForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="band band-white" id="visit">
        <div className="wrap contact-visit">
          <div className="contact-visit-copy">
            <p className="kicker">Visit</p>
            <h2 className="band-title">Studio in {agency.city}.</h2>
            <address className="contact-address">{agency.address}</address>
            <a
              className="link-draw"
              href={`https://maps.google.com/?q=${encodeURIComponent(agency.address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Maps <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="contact-visit-map">
            <div className="map-frame contact-map">
              <iframe
                title="NIKZ Media studio location"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="band band-blue">
        <div className="wrap hello-close">
          <div className="hello-copy">
            <p className="kicker">Next</p>
            <ScrollReveal
              splitBy="words"
              effect="rise"
              mode="enter"
              enableBlur
              stagger={0.05}
              containerClassName="band-reveal"
              textClassName="hello-title"
            >
              Say hi.
            </ScrollReveal>
          </div>
          <div className="hello-aside">
            <p className="band-copy">
              Prefer a message first? WhatsApp works. Prefer a form? Use the
              inquiry above.
            </p>
            <div className="hero-actions">
              <a
                className="btn btn-light"
                href={agency.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Message on WhatsApp
              </a>
              <a className="link-draw" href={`mailto:${agency.email}`} style={{ color: "#fff" }}>
                {agency.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
