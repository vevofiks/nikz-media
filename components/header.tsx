"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { agency, nav } from "@/lib/content";
import { useLenisRef } from "@/components/providers";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerId = useId();
  const lenisRef = useLenisRef();

  // Transparent white nav only works over the dark home hero.
  const canGoTransparent = pathname === "/";
  const solid = !canGoTransparent || scrolled;
  const logoSrc = solid ? "/logo-light.png" : "/logo.png";

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
    document.body.style.overflow = open ? "hidden" : "";
    const lenis = lenisRef?.current;
    if (lenis) {
      if (open) lenis.stop();
      else lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, lenisRef]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const drawer = document.getElementById(drawerId);
    if (!drawer) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
      }
      if (event.key !== "Tab") return;
      const nodes = drawer.querySelectorAll<HTMLElement>("a, button");
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
  ].join(" ");

  return (
    <header className={headerClass}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="header-bar">
        <Link href="/" className="wordmark" aria-label="NIKZ Media, home">
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
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls={drawerId}
          onClick={() => setOpen(true)}
        >
          <span className="burger" />
          <span className="sr">Menu</span>
        </button>
      </div>
      {open ? (
        <div
          id={drawerId}
          className="drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="drawer-top">
            <Link href="/" className="wordmark" onClick={() => setOpen(false)}>
              <img
                className="brand-logo"
                src="/logo-light.png"
                alt=""
                width={240}
                height={56}
              />
            </Link>
            <button
              ref={closeRef}
              className="menu-btn"
              type="button"
              onClick={() => {
                setOpen(false);
                menuRef.current?.focus();
              }}
            >
              <span className="sr">Close</span>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M3 3l10 10M13 3 3 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile">
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
          <div className="drawer-contact">
            <a href={`mailto:${agency.email}`}>{agency.email}</a>
            <a href={`tel:${agency.phoneTel}`}>{agency.phoneDisplay}</a>
            <a href={agency.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
