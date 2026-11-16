"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedContent from "@/components/AnimatedContent";
import FadeContent from "@/components/FadeContent";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollVelocity from "@/components/ScrollVelocity";
import {
  agency,
  inquiryHref,
  serviceGroups,
  serviceOptions,
} from "@/lib/content";

const practiceVisuals = [
  {
    id: "digital",
    image: "/photos/stream-work-03.jpg",
  },
  {
    id: "creative",
    image: "/photos/design.jpg",
  },
  {
    id: "web",
    image: "/photos/stream-work-01.jpg",
  },
] as const;

const servicePhotos = [
  "/photos/stream-work-03.jpg",
  "/photos/stream-work-04.jpg",
  "/photos/stream-work-02.jpg",
  "/photos/stream-work-06.jpg",
  "/photos/stream-work-05.jpg",
  "/photos/design.jpg",
  "/photos/color.jpg",
  "/photos/stream-07.jpg",
  "/photos/stream-work-01.jpg",
  "/photos/print.jpg",
] as const;

const allServices = serviceGroups.flatMap((group) =>
  group.items.map((item) => ({
    ...item,
    practice: group.title,
    practiceId: group.id,
  })),
);

export function ServicesView() {
  return (
    <div className="page services-page">
      <section className="band band-cream services-hero">
        <div className="wrap services-hero-grid">
          <div className="services-hero-copy">
            <p className="kicker">Services</p>
            <FadeContent effect="focus" duration={0.8}>
              <h1 className="services-hero-title">
                Three practices. Ten services.
              </h1>
            </FadeContent>
            <FadeContent effect="focus" duration={0.7}>
              <p className="services-hero-lede">
                Digital marketing, creative content, and web brand strategy.
                Real craft photos. Exact work under each practice.
              </p>
            </FadeContent>
            <nav className="services-jump" aria-label="Practice jump">
              {serviceGroups.map((group) => (
                <a key={group.id} href={`#${group.id}`}>
                  {group.index} {group.title}
                </a>
              ))}
            </nav>
          </div>
          <FadeContent effect="develop" duration={0.9} className="services-hero-media">
            <img src="/photos/stream-work-05.jpg" alt="" />
          </FadeContent>
        </div>
      </section>

      <section className="marquee-band" aria-label="Services ticker">
        <ScrollVelocity
          texts={[
            serviceOptions.slice(0, 5).join("  ·  "),
            serviceOptions.slice(5).join("  ·  "),
          ]}
          velocity={64}
          numCopies={4}
          fadeEdges
          pauseOnHover
          gap={48}
          fontSize="clamp(22px, 3vw, 44px)"
          fontWeight={700}
          color="#0042FF"
          className="marquee-text"
          separator={<span className="marquee-sep">✦</span>}
        />
      </section>

      {serviceGroups.map((group, index) => {
        const visual = practiceVisuals[index];

        return (
          <section
            key={group.id}
            id={group.id}
            className={`band ${index % 2 === 0 ? "band-white" : "band-cream"}`}
          >
            <div className="wrap practice-panel">
              <FadeContent
                effect="develop"
                duration={0.85}
                className="practice-panel-media"
              >
                <img src={visual.image} alt="" />
              </FadeContent>

              <div className="practice-panel-copy">
                <p className="kicker">{group.index}</p>
                <ScrollReveal
                  splitBy="words"
                  effect="rise"
                  mode="enter"
                  enableBlur
                  stagger={0.04}
                  containerClassName="band-reveal"
                  textClassName="practice-panel-title"
                >
                  {group.title}
                </ScrollReveal>
                <p className="practice-panel-line">{group.line}</p>

                <div className="practice-service-list">
                  {group.items.map((item, itemIndex) => (
                    <article className="practice-service" key={item.name}>
                      <span>
                        {String(itemIndex + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.summary}</p>
                        <Link
                          className="link-draw"
                          href={inquiryHref(item.name)}
                        >
                          Inquire <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="band band-cream">
        <div className="wrap">
          <div className="services-index-head">
            <div>
              <p className="kicker">All services</p>
              <h2 className="band-title">Pick a starting point.</h2>
            </div>
            <p className="services-index-note">
              Ten services across three practices. One studio in {agency.city}.
            </p>
          </div>

          <AnimatedContent
            distance={28}
            duration={0.7}
            stagger={0.08}
            className="services-index"
          >
            {allServices.map((item, index) => (
              <Link
                key={item.name}
                href={inquiryHref(item.name)}
                className="service-tile"
              >
                <div className="service-tile-media">
                  <img src={servicePhotos[index % servicePhotos.length]} alt="" />
                </div>
                <div className="service-tile-meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item.practice}</p>
                  <h3>{item.name}</h3>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </AnimatedContent>
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
              Tell us what should grow.
            </ScrollReveal>
          </div>
          <div className="hello-aside">
            <p className="band-copy">
              Pick a service, or describe the business and we will point to the
              right starting set.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-light" href="/contact">
                Start a project →
              </Link>
              <a
                className="link-draw"
                href={agency.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff" }}
              >
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
