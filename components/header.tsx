"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { agency, nav } from "@/lib/content";
import { useLenisRef } from "@/components/providers";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const drawerId = useId();
  const lenisRef = useLenisRef();

  // Transparent white nav only works over the dark home hero.
  const canGoTransparent = pathname === "/";
  const solid = !canGoTransparent || scrolled || open;
  const logoSrc = solid ? "/logo-light.png" : "/logo.png";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
    setScrolled(window.scrollY > 24);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";

    const main = document.getElementById("main");
    const footer = document.querySelector("body > footer, .site-footer");
    if (open) {
      main?.setAttribute("inert", "");
      main?.setAttribute("aria-hidden", "true");
      footer?.setAttribute("inert", "");
      footer?.setAttribute("aria-hidden", "true");
    } else {
      main?.removeAttribute("inert");
      main?.removeAttribute("aria-hidden");
      footer?.removeAttribute("inert");
      footer?.removeAttribute("aria-hidden");
    }

    const lenis = lenisRef?.current;
    if (lenis) {
      if (open) lenis.stop();
      else lenis.start();
    }
    return () => {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      main?.removeAttribute("aria-hidden");
      footer?.removeAttribute("inert");
      footer?.removeAttribute("aria-hidden");
      if (lenis) lenis.start();
    };
  }, [open, lenisRef]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const drawer = document.getElementById(drawerId);
      if (!drawer) return;
      const nodes = [
        menuRef.current,
        ...Array.from(drawer.querySelectorAll<HTMLElement>("a, button")),
      ].filter(Boolean) as HTMLElement[];
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, drawerId]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1080) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const headerClass = [
    "site-header",
    solid ? "is-scrolled" : "is-transparent",
    open ? "is-menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const menuLayer =
    mounted &&
    createPortal(
      <>
        <div
          className={`drawer-scrim${open ? " is-open" : ""}`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          id={drawerId}
          className={`drawer${open ? " is-open" : ""}`}
          role="dialog"
          aria-modal={open}
          aria-label="Menu"
          aria-hidden={!open}
          inert={!open ? true : undefined}
        >
          <nav className="drawer-nav" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="drawer-footer">
            <Link
              className="btn drawer-cta"
              href="/contact"
              onClick={() => setOpen(false)}
            >
              Start a project →
            </Link>
            <div className="drawer-contact">
              <a href={`mailto:${agency.email}`}>{agency.email}</a>
              <a href={`tel:${agency.phoneTel}`}>{agency.phoneDisplay}</a>
              <a
                href={agency.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </>,
      document.body,
    );

  return (
    <>
      <header className={headerClass}>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <div className="header-bar">
          <Link
            href="/"
            className="wordmark"
            aria-label="NIKZ Media, home"
            onClick={() => setOpen(false)}
          >
            <img
              className="brand-logo"
              src={logoSrc}
              alt=""
              width={280}
              height={64}
            />
          </Link>
          <nav className="desk-nav" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className={`btn btn-small desk-cta${solid ? "" : " desk-cta-ghost"}`}
          >
            Start a project
          </Link>
          <button
            ref={menuRef}
            className={`menu-btn${open ? " is-open" : ""}`}
            type="button"
            aria-expanded={open}
            aria-controls={drawerId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="burger" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>
      {menuLayer}
    </>
  );
}
