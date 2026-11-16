"use client";

import Link from "next/link";
import BlurText from "@/components/react-bits/BlurText/BlurText";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { agency } from "@/lib/content";

const STREAM_IMAGES = [
  {
    src: "/photos/design.jpg",
    alt: "Color studies and tablet sketches on a studio desk",
  },
  {
    src: "/photos/stream-work-01.jpg",
    alt: "Brand system open on a studio display",
  },
  {
    src: "/photos/print.jpg",
    alt: "Interface wireframes drawn on a tablet",
  },
  {
    src: "/photos/stream-work-03.jpg",
    alt: "Analytics dashboard on a laptop",
  },
  {
    src: "/photos/color.jpg",
    alt: "Blue and orange ink moving through water",
  },
  {
    src: "/photos/stream-work-02.jpg",
    alt: "Team planning work on a whiteboard",
  },
  {
    src: "/photos/stream-work-04.jpg",
    alt: "Creative session with notes on the wall",
  },
  {
    src: "/photos/stream-work-05.jpg",
    alt: "People collaborating around a table",
  },
  {
    src: "/photos/stream-work-06.jpg",
    alt: "Two people reviewing work on a laptop",
  },
  {
    src: "/photos/stream-01.jpg",
    alt: "Soft layered color field",
  },
  {
    src: "/photos/stream-05.jpg",
    alt: "Ink bloom in blue and orange",
  },
  {
    src: "/photos/stream-03.jpg",
    alt: "Palette book and tablet on a dark desk",
  },
];

export function HeroStage() {
  return (
    <section className="hero-stream">
      <ImageStreamHero
        images={STREAM_IMAGES}
        cards={9}
        speed={20}
        axis={52}
        className="hero-stream-stage"
        path={{
          birthHeight: 2.4,
          exitHeight: 40,
          railExit: 46,
          cardRadius: 0.55,
        }}
      >
        <div className="hero-stream-copy">
          <p className="hero-stream-tag">{agency.positioning}</p>
          <h1 className="hero-stream-title">
            <BlurText
              text="Create. Connect. Grow."
              animateBy="words"
              direction="bottom"
              delay={90}
              trigger="load"
            />
          </h1>
        </div>
      </ImageStreamHero>
      <div className="hero-stream-bottom">
        <p className="hero-stream-lede">
          NIKZ Media is a creative digital marketing agency in {agency.city}.
          Social, content, ads, websites, and brand work that puts your
          business in front of the right people.
        </p>
        <div className="hero-stream-actions">
          <Link className="btn" href="/contact">
            Start a project
          </Link>
          <Link className="link-draw" href="/services">
            See the services
          </Link>
        </div>
      </div>
    </section>
  );
}
