"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedContent from "@/components/AnimatedContent";
import FadeContent from "@/components/FadeContent";
import ScrollReveal from "@/components/ScrollReveal";
import {
  aboutCopy,
  agency,
  approach,
  values,
} from "@/lib/content";

const valuePhotos = [
  "/photos/design.jpg",
  "/photos/stream-work-04.jpg",
  "/photos/stream-work-03.jpg",
] as const;

const approachPhotos = [
  "/photos/print.jpg",
  "/photos/stream-work-05.jpg",
  "/photos/stream-work-01.jpg",
] as const;

export function AboutView() {
  return (
    <div className="page about-page">
      <section className="band band-cream about-hero">
        <div className="wrap about-hero-grid">
          <div className="about-hero-copy">
            <p className="kicker">About</p>
            <FadeContent effect="focus" duration={0.8}>
              <h1 className="about-hero-title">The studio, said plainly.</h1>
            </FadeContent>
            <FadeContent effect="focus" duration={0.75}>
              <p className="about-hero-lede">{aboutCopy}</p>
            </FadeContent>
            <div className="hero-actions about-hero-actions">
              <Link className="btn" href="/contact">
                Start a project →
              </Link>
              <Link className="link-draw" href="/services">
                See services <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <FadeContent effect="develop" duration={0.9} className="about-hero-media">
            <img src="/photos/stream-work-05.jpg" alt="" />
          </FadeContent>
        </div>
      </section>

      <section className="band band-white">
        <div className="wrap about-studio">
          <FadeContent effect="develop" duration={0.85} className="about-studio-media">
            <img src="/photos/stream-work-02.jpg" alt="" />
          </FadeContent>
          <div className="about-studio-copy">
            <p className="kicker">Studio</p>
            <ScrollReveal
              splitBy="words"
              effect="rise"
              mode="enter"
              enableBlur
              stagger={0.04}
              containerClassName="band-reveal"
              textClassName="about-studio-title"
            >
              {agency.name}
            </ScrollReveal>
            <p className="about-studio-line">
              {agency.positioning}. Based in {agency.city}.
            </p>
            <dl className="about-fact-list">
              <div>
                <dt>Focus</dt>
                <dd>{agency.tagline}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${agency.email}`}>{agency.email}</a>
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${agency.phoneTel}`}>{agency.phoneDisplay}</a>
                </dd>
              </div>
              <div>
                <dt>Visit</dt>
                <dd>
                  <address>{agency.address}</address>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="band band-cream">
        <div className="wrap">
          <div className="about-section-head">
            <div>
              <p className="kicker">Values</p>
              <h2 className="band-title">What the work is held to.</h2>
            </div>
            <p className="about-section-note">
              Three measures. Creativity, consistency, and results you can
              check.
            </p>
          </div>

          <AnimatedContent
            distance={28}
            duration={0.7}
            stagger={0.1}
            className="about-value-grid"
          >
            {values.map((value, index) => (
              <article className="about-value" key={value.title}>
                <div className="about-value-media">
                  <img src={valuePhotos[index]} alt="" />
                </div>
                <span>{value.index}</span>
                <h3>{value.title}</h3>
                <p>{value.copy}</p>
              </article>
            ))}
          </AnimatedContent>
        </div>
      </section>

      <section className="band band-white">
        <div className="wrap">
          <div className="about-section-head">
            <div>
              <p className="kicker">Approach</p>
              <ScrollReveal
                splitBy="words"
                effect="rise"
                mode="enter"
                enableBlur
                stagger={0.05}
                containerClassName="band-reveal"
                textClassName="band-title"
              >
                How the work moves.
              </ScrollReveal>
            </div>
          </div>

          <ol className="about-approach">
            {approach.map((step, index) => (
              <li key={step.title}>
                <FadeContent effect="develop" duration={0.8}>
                  <img src={approachPhotos[index]} alt="" />
                </FadeContent>
                <div>
                  <span>{step.index}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
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
              Work with us.
            </ScrollReveal>
          </div>
          <div className="hello-aside">
            <p className="band-copy">
              Tell us what should grow. Email, WhatsApp, or the inquiry form.
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
