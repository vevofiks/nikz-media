"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

async function knockoutBlack(src: string) {
  const image = new window.Image();
  image.decoding = "async";
  image.src = src;
  await image.decode();

  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return src;

  ctx.drawImage(image, 0, 0);
  const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = frame;

  // Only punch true plate black. Keep dark laptop chassis readable on blue.
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    if (max < 8) {
      data[i + 3] = 0;
    } else if (max < 14) {
      data[i + 3] = Math.round(data[i + 3] * ((max - 6) / 8));
    }
  }

  ctx.putImageData(frame, 0, 0);
  return canvas.toDataURL("image/png");
}

export function HeroVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState("/laptop.png");

  useEffect(() => {
    let alive = true;
    knockoutBlack("/laptop.png")
      .then((url) => {
        if (alive) setSrc(url);
      })
      .catch(() => {
        if (alive) setSrc("/laptop.png");
      });
    return () => {
      alive = false;
    };
  }, []);

  useGSAP(
    () => {
      const laptop = laptopRef.current;
      const floatEl = floatRef.current;
      const glow = glowRef.current;
      const root = rootRef.current;
      if (!laptop || !root || !floatEl) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(laptop, {
        xPercent: reduce ? 0 : 28,
        yPercent: reduce ? 0 : 10,
        rotate: reduce ? -8 : 4,
        opacity: reduce ? 1 : 0,
        scale: reduce ? 1 : 0.88,
        transformOrigin: "70% 60%",
      });

      if (glow) {
        gsap.set(glow, { opacity: reduce ? 0.7 : 0, scale: reduce ? 1 : 0.7 });
      }

      if (!reduce) {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .to(
            laptop,
            {
              xPercent: 0,
              yPercent: 0,
              rotate: -8,
              opacity: 1,
              scale: 1,
              duration: 1.45,
              delay: 0.28,
            },
            0,
          )
          .to(glow, { opacity: 0.85, scale: 1, duration: 1.3 }, 0.35);

        gsap.to(floatEl, {
          y: -10,
          rotate: 0.8,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.6,
        });

        if (glow) {
          gsap.to(glow, {
            y: -6,
            scale: 1.03,
            duration: 3.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.6,
          });
        }
      }

      const hero = root.closest(".hero") ?? root;
      const copy = hero.querySelector(".hero-copy");

      const parallax = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      parallax
        .to(laptop, { yPercent: 18, xPercent: 6, rotate: -4, ease: "none" }, 0)
        .to(glow, { yPercent: 10, opacity: 0.35, ease: "none" }, 0);

      if (copy) {
        parallax.to(copy, { yPercent: -8, ease: "none" }, 0);
      }
    },
    { scope: rootRef, dependencies: [src] },
  );

  return (
    <div className="hero-media" ref={rootRef} aria-hidden="true">
      <div className="hero-media-glow" ref={glowRef} />
      <div className="hero-laptop" ref={laptopRef}>
        <div className="hero-laptop-float" ref={floatRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            className="hero-laptop-img"
            width={1600}
            height={1200}
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}
