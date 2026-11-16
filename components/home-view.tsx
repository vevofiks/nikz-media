"use client";

import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import {
  SiFacebook,
  SiFigma,
  SiGoogleanalytics,
  SiGoogleads,
  SiInstagram,
  SiMeta,
  SiWhatsapp,
  SiWordpress,
  SiYoutube,
} from "react-icons/si";
import AnimatedContent from "@/components/AnimatedContent";
import FadeContent from "@/components/FadeContent";
import LogoLoop from "@/components/LogoLoop";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollVelocity from "@/components/ScrollVelocity";
import { HomeHero } from "@/components/home-hero";
import {
  aboutCopy,
  agency,
  approach,
  industries,
  serviceGroups,
  serviceOptions,
} from "@/lib/content";

export { HomeHero as EclipseHero };

const platformLogos = [
  { node: <SiMeta />, title: "Meta", hoverColor: "#0668E1" },
  { node: <SiFacebook />, title: "Facebook", hoverColor: "#1877F2" },
  { node: <SiInstagram />, title: "Instagram", hoverColor: "#E4405F" },
  { node: <SiGoogleads />, title: "Google Ads", hoverColor: "#4285F4" },
  { node: <SiGoogleanalytics />, title: "Analytics", hoverColor: "#E37400" },
  { node: <SiYoutube />, title: "YouTube", hoverColor: "#FF0000" },
  { node: <FaLinkedin />, title: "LinkedIn", hoverColor: "#0A66C2" },
  { node: <SiWhatsapp />, title: "WhatsApp", hoverColor: "#25D366" },
  { node: <SiWordpress />, title: "WordPress", hoverColor: "#21759B" },
  { node: <SiFigma />, title: "Figma", hoverColor: "#F24E1E" },
];

const featuredWork = [
  {
    index: "01",
    title: "Digital Marketing",
    line: "Social, search, Meta ads, Google ads",
    image: "/photos/stream-work-03.jpg",
    href: "/services#digital",
  },
  {
    index: "02",
    title: "Creative & Content",
    line: "Content, design, reels, production",
    image: "/photos/design.jpg",
    href: "/services#creative",
  },
  {
    index: "03",
    title: "Web & Brand",
    line: "Websites and brand strategy",
    image: "/photos/stream-work-01.jpg",
    href: "/services#web",
  },
] as const;

const faqs = [
  {
    q: "What does NIKZ Media do?",
    a: "We are a creative digital marketing agency in Kottayam. The work covers digital marketing, creative content, websites, and brand strategy.",
  },
  {
    q: "Which services can we start with?",
    a: "Any of the ten: social media, SEO, Meta ads, Google ads, content creation, graphic design, reels, video production, websites, or branding.",
  },
  {
    q: "Do you work with businesses outside Kerala?",
    a: "Yes. The studio is in Kottayam, and the work travels. Remote collaboration is normal for campaigns, content, and websites.",
  },
  {
    q: "How do we begin?",
    a: "Use the inquiry form, email, or WhatsApp. Say which service you need and what the business is trying to grow.",
  },
];

export function HomeSections() {
  return (
    <>
      {/* Metalab / Huge: short positioning manifesto */}
      <section id="home-after-hero" className="band band-cream">
        <div className="wrap manifesto">
          <div className="manifesto-main">
            <p className="kicker">The studio</p>
            <ScrollReveal
              splitBy="words"
              effect="rise"
              mode="enter"
              enableBlur
              stagger={0.04}
              containerClassName="band-reveal"
              textClassName="manifesto-title"
            >
              We make brands visible.
            </ScrollReveal>
          </div>
          <FadeContent effect="focus" duration={0.75}>
            <p className="manifesto-copy">
              A digital-first creative agency in {agency.city}. Brand, content,
              campaigns, and websites that work together instead of pulling
              apart.
            </p>
          </FadeContent>
        </div>
      </section>

      <section className="marquee-band" aria-label="Digital and creative services">
        <ScrollVelocity
          texts={[serviceOptions.slice(0, 5).join("  ·  ")]}
          velocity={64}
          numCopies={4}
          fadeEdges
          pauseOnHover
          gap={48}
          fontSize="clamp(28px, 4vw, 56px)"
          fontWeight={700}
          color="#0042FF"
          className="marquee-text"
          separator={<span className="marquee-sep">✦</span>}
        />
      </section>

      <section className="marquee-band marquee-band-alt" aria-label="Web and brand services">
        <ScrollVelocity
          texts={[serviceOptions.slice(5).join("  ·  ")]}
          velocity={-56}
          numCopies={4}
          fadeEdges
          pauseOnHover
          gap={48}
          fontSize="clamp(28px, 4vw, 56px)"
          fontWeight={700}
          color="#0042FF"
          className="marquee-text"
          separator={<span className="marquee-sep">✦</span>}
        />
      </section>

      {/* Instrument: roster as one paragraph */}
      <section className="band band-white section-screen">
        <div className="wrap roster">
          <p className="kicker">Who we work with</p>
          <FadeContent effect="focus" duration={0.8}>
            <p className="roster-line">
              <span>Select industries include:</span>{" "}
              {industries.map((item) => item.name).join(", ")}.
            </p>
          </FadeContent>
        </div>
      </section>

      <section className="band band-white logo-loop-band">
        <div className="wrap">
          <div className="logo-loop-head">
            <p className="kicker">Clients</p>
            <h2 className="band-title">Companies we have worked with.</h2>
          </div>
        </div>
        <div className="logo-loop-frame">
          <LogoLoop
            logos={platformLogos}
            speed={90}
            direction="left"
            logoHeight={72}
            gap={72}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            labels="hover"
            muted={0.35}
            ariaLabel="Companies NIKZ Media has worked with"
          />
        </div>
      </section>

      {/* BASIC/DEPT: work-first large frames */}
      <section className="band band-cream">
        <div className="wrap">
          <div className="work-head">
            <div>
              <p className="kicker">Selected work</p>
              <h2 className="band-title">Practices in motion.</h2>
            </div>
            <Link className="link-draw" href="/services">
              All services <ArrowUpRight size={16} />
            </Link>
          </div>
          <AnimatedContent
            distance={36}
            duration={0.75}
            stagger={0.12}
            className="work-frames"
          >
            {featuredWork.map((item) => (
              <Link key={item.index} href={item.href} className="work-frame">
                <div className="work-frame-media">
                  <img src={item.image} alt="" />
                </div>
                <div className="work-frame-meta">
                  <span>{item.index}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.line}</p>
                  </div>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </AnimatedContent>
        </div>
      </section>

      {/* Clay / Pentagram: services as ledger rows, not cards */}
      <section className="band band-blue">
        <div className="wrap">
          <p className="kicker">Services</p>
          <ScrollReveal
            splitBy="words"
            effect="rise"
            mode="enter"
            enableBlur
            stagger={0.04}
            containerClassName="band-reveal"
            textClassName="band-title"
          >
            Brand. Product. Marketing.
          </ScrollReveal>
          <FadeContent effect="focus" duration={0.7}>
            <p className="band-copy">
              Three practices. Ten services. One studio.
            </p>
          </FadeContent>
          <div className="practice-rows">
            {serviceGroups.map((group) => (
              <article className="practice-row" key={group.id}>
                <p className="idx">{group.index}</p>
                <div className="practice-row-body">
                  <h3>{group.title}</h3>
                  <p>{group.line}</p>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.name}>{item.name}</li>
                    ))}
                  </ul>
                </div>
                <Link className="link-draw" href={`/services#${group.id}`}>
                  Open <ArrowUpRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Huge-style type moment + photo */}
      <section className="band band-cream section-screen">
        <div className="wrap type-moment">
          <div>
            <p className="type-moment-kicker">Why NIKZ</p>
            <ScrollReveal
              splitBy="words"
              effect="rise"
              mode="enter"
              enableBlur
              stagger={0.05}
              containerClassName="band-reveal"
              textClassName="type-moment-title"
            >
              Real problem. Real direction.
            </ScrollReveal>
            <FadeContent effect="focus" duration={0.75}>
              <p className="type-moment-copy">{aboutCopy}</p>
            </FadeContent>
          </div>
          <div className="type-moment-photo">
            <img src="/photos/stream-work-05.jpg" alt="" />
          </div>
        </div>
      </section>

      {/* Locomotive-style approach steps */}
      <section className="band band-white">
        <div className="wrap">
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
            Less guessing. More direction.
          </ScrollReveal>
          <ol className="approach-index">
            {approach.map((step, index) => (
              <li key={step.title}>
                <span>{step.index}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
                <img
                  src={
                    [
                      "/photos/print.jpg",
                      "/photos/stream-work-04.jpg",
                      "/photos/stream-work-06.jpg",
                    ][index]
                  }
                  alt=""
                />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Industry index like Clay plain lists */}
      <section className="band band-cream">
        <div className="wrap">
          <p className="kicker">Industries</p>
          <h2 className="band-title">Different businesses. Same need.</h2>
          <ul className="industry-index">
            {industries.map((item, index) => (
              <li key={item.name}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{item.name}</strong>
                <p>{item.support}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band-white">
        <div className="wrap faq-grid">
          <div>
            <p className="kicker">FAQ</p>
            <h2 className="band-title">Questions, answered plainly.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <details className="faq-item" key={item.q}>
                <summary>
                  {item.q}
                  <Plus size={18} aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Huge closing: Hello / say hi */}
      <section className="band band-blue">
        <div className="wrap hello-close">
          <div className="hello-copy">
            <p className="kicker">Next</p>
            <ScrollReveal
              splitBy="words"
              effect="rise"
              mode="enter"
              enableBlur
              stagger={0.06}
              containerClassName="band-reveal"
              textClassName="hello-title"
            >
              Say hi.
            </ScrollReveal>
          </div>
          <div className="hello-aside">
            <p className="band-copy">
              Tell us what should grow. Email, WhatsApp, or the inquiry form.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-light" href="/contact">
                Start a project
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
    </>
  );
}
