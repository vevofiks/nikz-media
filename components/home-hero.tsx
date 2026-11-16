"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Silk from "@/components/Silk";
import { HeroVisual } from "@/components/hero-visual";
import { agency } from "@/lib/content";

gsap.registerPlugin(useGSAP);

const lines = ["CREATE", "CONNECT", "GROW"] as const;

export function HomeHero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const titleLines = root.querySelectorAll(".hero-title-line");
      const eyebrow = root.querySelector(".hero-eyebrow");
      const lede = root.querySelector(".hero-lede");
      const actions = root.querySelector(".hero-actions");
      const meta = root.querySelector(".hero-meta");

      if (reduce) {
        gsap.set([titleLines, eyebrow, lede, actions, meta], {
          clearProps: "all",
        });
        return;
      }

      gsap.set(titleLines, { yPercent: 110, opacity: 0, rotate: 2 });
      gsap.set([eyebrow, lede, actions, meta], { y: 24, opacity: 0 });

      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.12,
      });

      intro
        .to(eyebrow, { y: 0, opacity: 1, duration: 0.7 }, 0)
        .to(
          titleLines,
          {
            yPercent: 0,
            opacity: 1,
            rotate: 0,
            duration: 1.05,
            stagger: 0.1,
            ease: "power4.out",
          },
          0.08,
        )
        .to(lede, { y: 0, opacity: 1, duration: 0.75 }, 0.55)
        .to(actions, { y: 0, opacity: 1, duration: 0.7 }, 0.7)
        .to(meta, { y: 0, opacity: 1, duration: 0.65 }, 0.85);
    },
    { scope: rootRef },
  );

  return (
    <section className="hero" ref={rootRef}>
      <div className="hero-bg" aria-hidden="true">
        <Silk
          color="#0042FF"
          sheenColor="#ffffff"
          speed={3.2}
          scale={1.08}
          rotation={0}
          sheen={0.5}
          depth={0.52}
          glow={0.3}
          noiseIntensity={1.05}
          mouseInteraction
          clickRipple
          intro
          className="hero-silk"
        />
      </div>

      <div className="wrap hero-stage">
        <div className="hero-copy">
          <div className="hero-copy-inner">
            <p className="hero-eyebrow">
              Creative digital marketing · {agency.city}
            </p>

            <h1 className="hero-title">
              {lines.map((line) => (
                <span className="hero-title-mask" key={line}>
                  <span
                    className={`hero-title-line${line === "GROW" ? " hero-title-grow" : ""}`}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p className="hero-lede">
              Brand, content, campaigns, and websites that work as one clear
              presence. Not scattered posts. Direction.
            </p>

            <div className="hero-actions">
              <Link className="btn btn-light" href="/contact">
                Start a project →
              </Link>
              <Link className="hero-link" href="/services">
                See services
              </Link>
            </div>

            <p className="hero-meta">
              10 services · 3 practices · 7 industries
            </p>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
