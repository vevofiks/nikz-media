"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Inquiry, SiteContent } from "@/lib/site-types";

type Tab = "agency" | "about" | "services" | "industries" | "inquiries";

export function AdminApp({ authed }: { authed: boolean }) {
  const [loggedIn, setLoggedIn] = useState(authed);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("agency");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/cms/content");
      if (res.ok) {
        setLoggedIn(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loggedIn) return;
    void loadAll();
  }, [loggedIn]);

  async function loadAll() {
    setBusy(true);
    setStatus("");
    try {
      const [cRes, iRes] = await Promise.all([
        fetch("/api/cms/content"),
        fetch("/api/cms/inquiries"),
      ]);
      if (!cRes.ok || !iRes.ok) {
        setLoggedIn(false);
        setStatus("Session expired. Sign in again.");
        return;
      }
      setContent((await cRes.json()) as SiteContent);
      setInquiries((await iRes.json()) as Inquiry[]);
    } catch {
      setStatus("Could not load CMS data.");
    } finally {
      setBusy(false);
    }
  }

  async function onLogin(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    const res = await fetch("/api/cms/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (!res.ok) {
      setStatus("Wrong password.");
      return;
    }
    setPassword("");
    setLoggedIn(true);
  }

  async function onLogout() {
    await fetch("/api/cms/logout", { method: "POST" });
    setLoggedIn(false);
    setContent(null);
    setInquiries([]);
  }

  async function onSave() {
    if (!content) return;
    setBusy(true);
    setStatus("");
    const res = await fetch("/api/cms/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setBusy(false);
    if (!res.ok) {
      setStatus("Save failed.");
      return;
    }
    setStatus(
      "Saved to data/site.json. Restart the server (or redeploy) to publish content on the public pages. Inquiries update live.",
    );
  }

  async function onDeleteInquiry(id: string) {
    const res = await fetch(`/api/cms/inquiries?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setInquiries((current) => current.filter((item) => item.id !== id));
    }
  }

  const tabs = useMemo(
    () =>
      [
        ["agency", "Agency"],
        ["about", "About"],
        ["services", "Services"],
        ["industries", "Industries"],
        ["inquiries", `Inquiries (${inquiries.length})`],
      ] as const,
    [inquiries.length],
  );

  if (!loggedIn) {
    return (
      <div className="admin-card">
        <h1>NIKZ CMS</h1>
        <p>Sign in to edit site content and review inquiries.</p>
        <form onSubmit={onLogin} className="admin-form">
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          <button className="btn" type="submit" disabled={busy}>
            Sign in
          </button>
        </form>
        {status ? <p className="admin-status">{status}</p> : null}
      </div>
    );
  }

  if (!content) {
    return (
      <div className="admin-card">
        <p>{busy ? "Loading…" : "No content loaded."}</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <header className="admin-top">
        <div>
          <p className="kicker">Admin</p>
          <h1>Content CMS</h1>
        </div>
        <div className="admin-top-actions">
          <button className="btn" type="button" onClick={onSave} disabled={busy}>
            Save changes
          </button>
          <button className="btn btn-light" type="button" onClick={onLogout}>
            Sign out
          </button>
        </div>
      </header>

      <nav className="admin-tabs" aria-label="CMS sections">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={tab === id ? "is-active" : undefined}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {status ? <p className="admin-status">{status}</p> : null}

      {tab === "agency" ? (
        <section className="admin-card">
          <h2>Agency details</h2>
          <div className="admin-grid">
            {(
              [
                ["name", "Name"],
                ["tagline", "Tagline"],
                ["positioning", "Positioning"],
                ["email", "Email"],
                ["phoneDisplay", "Phone display"],
                ["phoneTel", "Phone tel"],
                ["whatsapp", "WhatsApp URL"],
                ["city", "City"],
                ["siteUrl", "Site URL"],
              ] as const
            ).map(([key, label]) => (
              <label key={key}>
                {label}
                <input
                  value={content.agency[key]}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      agency: { ...content.agency, [key]: e.target.value },
                    })
                  }
                />
              </label>
            ))}
            <label className="admin-span">
              Address
              <textarea
                value={content.agency.address}
                onChange={(e) =>
                  setContent({
                    ...content,
                    agency: { ...content.agency, address: e.target.value },
                  })
                }
              />
            </label>
            <label>
              SEO title
              <input
                value={content.seo.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    seo: { ...content.seo, title: e.target.value },
                  })
                }
              />
            </label>
            <label className="admin-span">
              SEO description
              <textarea
                value={content.seo.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    seo: { ...content.seo, description: e.target.value },
                  })
                }
              />
            </label>
          </div>
        </section>
      ) : null}

      {tab === "about" ? (
        <section className="admin-card">
          <h2>About copy</h2>
          <label>
            Studio story
            <textarea
              rows={8}
              value={content.aboutCopy}
              onChange={(e) =>
                setContent({ ...content, aboutCopy: e.target.value })
              }
            />
          </label>
          <h3>Values</h3>
          {content.values.map((value, index) => (
            <div className="admin-block" key={value.index}>
              <input
                value={value.title}
                onChange={(e) => {
                  const values = [...content.values];
                  values[index] = { ...value, title: e.target.value };
                  setContent({ ...content, values });
                }}
              />
              <textarea
                value={value.copy}
                onChange={(e) => {
                  const values = [...content.values];
                  values[index] = { ...value, copy: e.target.value };
                  setContent({ ...content, values });
                }}
              />
            </div>
          ))}
          <h3>Approach</h3>
          {content.approach.map((step, index) => (
            <div className="admin-block" key={step.index}>
              <input
                value={step.title}
                onChange={(e) => {
                  const approach = [...content.approach];
                  approach[index] = { ...step, title: e.target.value };
                  setContent({ ...content, approach });
                }}
              />
              <textarea
                value={step.copy}
                onChange={(e) => {
                  const approach = [...content.approach];
                  approach[index] = { ...step, copy: e.target.value };
                  setContent({ ...content, approach });
                }}
              />
            </div>
          ))}
        </section>
      ) : null}

      {tab === "services" ? (
        <section className="admin-card">
          <h2>Services</h2>
          {content.serviceGroups.map((group, gIndex) => (
            <div className="admin-block" key={group.id}>
              <h3>
                {group.index} {group.title}
              </h3>
              <input
                value={group.title}
                onChange={(e) => {
                  const serviceGroups = [...content.serviceGroups];
                  serviceGroups[gIndex] = { ...group, title: e.target.value };
                  setContent({ ...content, serviceGroups });
                }}
              />
              <input
                value={group.line}
                onChange={(e) => {
                  const serviceGroups = [...content.serviceGroups];
                  serviceGroups[gIndex] = { ...group, line: e.target.value };
                  setContent({ ...content, serviceGroups });
                }}
              />
              {group.items.map((item, iIndex) => (
                <div key={`${group.id}-${item.name}`} className="admin-nested">
                  <input
                    value={item.name}
                    onChange={(e) => {
                      const serviceGroups = [...content.serviceGroups];
                      const items = [...group.items];
                      items[iIndex] = { ...item, name: e.target.value };
                      serviceGroups[gIndex] = { ...group, items };
                      setContent({ ...content, serviceGroups });
                    }}
                  />
                  <textarea
                    value={item.summary}
                    onChange={(e) => {
                      const serviceGroups = [...content.serviceGroups];
                      const items = [...group.items];
                      items[iIndex] = { ...item, summary: e.target.value };
                      serviceGroups[gIndex] = { ...group, items };
                      setContent({ ...content, serviceGroups });
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </section>
      ) : null}

      {tab === "industries" ? (
        <section className="admin-card">
          <h2>Industries</h2>
          {content.industries.map((item, index) => (
            <div className="admin-block" key={item.name}>
              <input
                value={item.name}
                onChange={(e) => {
                  const industries = [...content.industries];
                  industries[index] = { ...item, name: e.target.value };
                  setContent({ ...content, industries });
                }}
              />
              <textarea
                value={item.support}
                onChange={(e) => {
                  const industries = [...content.industries];
                  industries[index] = { ...item, support: e.target.value };
                  setContent({ ...content, industries });
                }}
              />
            </div>
          ))}
        </section>
      ) : null}

      {tab === "inquiries" ? (
        <section className="admin-card">
          <h2>Inquiries</h2>
          {inquiries.length === 0 ? (
            <p>No inquiries yet.</p>
          ) : (
            <ul className="admin-inquiry-list">
              {inquiries.map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>{item.name}</strong> · {item.service}
                    <p>
                      {item.email} · {item.phone}
                      {item.business ? ` · ${item.business}` : ""}
                    </p>
                    <p>{item.message}</p>
                    <p className="admin-meta">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => onDeleteInquiry(item.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}
    </div>
  );
}
