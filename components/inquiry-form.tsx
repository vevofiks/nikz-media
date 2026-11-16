"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { agency, serviceOptions } from "@/lib/content";

type Fields = {
  name: string;
  email: string;
  phone: string;
  business: string;
  service: string;
  message: string;
};

const empty: Fields = {
  name: "",
  email: "",
  phone: "",
  business: "",
  service: "",
  message: "",
};

function validate(values: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (values.name.trim().length < 2) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 8) errors.phone = "Enter a phone number with at least 8 digits.";
  if (!values.service) errors.service = "Choose a service.";
  if (values.message.trim().length < 10) {
    errors.message = "Write a short note, at least 10 characters.";
  }
  return errors;
}

export function InquiryForm() {
  const params = useSearchParams();
  const preset = params.get("service") ?? "";
  const validPreset = serviceOptions.includes(preset) ? preset : "";
  const [values, setValues] = useState<Fields>({ ...empty, service: validPreset });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedNote, setSavedNote] = useState("");

  useEffect(() => {
    if (validPreset) {
      setValues((current) => ({ ...current, service: validPreset }));
    }
  }, [validPreset]);

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setReady(false);
    setSavedNote("");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) {
      setReady(false);
      const first = Object.keys(next)[0];
      document.getElementById(first)?.focus();
      return;
    }

    setSaving(true);
    setSavedNote("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          business: values.business.trim(),
          service: values.service,
          message: values.message.trim(),
        }),
      });
      if (res.ok) {
        setSavedNote("Saved to the studio inbox. You can also send by email or WhatsApp.");
      } else {
        setSavedNote("Could not save to the inbox. You can still send by email or WhatsApp.");
      }
    } catch {
      setSavedNote("Could not save to the inbox. You can still send by email or WhatsApp.");
    } finally {
      setSaving(false);
      setReady(true);
    }
  }

  const body = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Phone: ${values.phone.trim()}`,
    `Business: ${values.business.trim() || "Not given"}`,
    `Service: ${values.service}`,
    "",
    values.message.trim(),
  ].join("\n");

  const mailto = `mailto:${agency.email}?subject=${encodeURIComponent(
    `Inquiry from ${values.name.trim()}`,
  )}&body=${encodeURIComponent(body)}`;
  const whatsapp = `${agency.whatsapp}?text=${encodeURIComponent(body)}`;

  return (
    <form className="inquiry" onSubmit={onSubmit} noValidate>
      <div className="inquiry-head">
        <p className="inquiry-kicker">Project brief</p>
        <p className="form-note">
          Save the inquiry for the studio, then open email or WhatsApp if you
          want to send it yourself.
        </p>
      </div>
      <div className="fields">
        <div className="fields-row">
          <Field
            id="name"
            label="Name"
            error={errors.name}
            value={values.name}
            autoComplete="name"
            onChange={(value) => update("name", value)}
          />
          <Field
            id="email"
            label="Email"
            type="email"
            error={errors.email}
            value={values.email}
            autoComplete="email"
            onChange={(value) => update("email", value)}
          />
        </div>
        <div className="fields-row">
          <Field
            id="phone"
            label="Phone"
            type="tel"
            error={errors.phone}
            value={values.phone}
            autoComplete="tel"
            onChange={(value) => update("phone", value)}
          />
          <Field
            id="business"
            label="Business name"
            error={errors.business}
            value={values.business}
            autoComplete="organization"
            onChange={(value) => update("business", value)}
            optional
          />
        </div>
        <label className={errors.service ? "field has-error" : "field"} htmlFor="service">
          <span>Service interested in</span>
          <select
            id="service"
            name="service"
            value={values.service}
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={errors.service ? "service-error" : undefined}
            onChange={(event) => update("service", event.target.value)}
          >
            <option value="">Select a service</option>
            {serviceOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          {errors.service ? (
            <span className="error" id="service-error">
              {errors.service}
            </span>
          ) : null}
        </label>
        <label className={errors.message ? "field has-error" : "field"} htmlFor="message">
          <span>Message</span>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="What should grow, and which audience matters?"
            value={values.message}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            onChange={(event) => update("message", event.target.value)}
          />
          {errors.message ? (
            <span className="error" id="message-error">
              {errors.message}
            </span>
          ) : null}
        </label>
      </div>
      <div className="form-actions">
        <button className="btn inquiry-submit" type="submit" disabled={saving}>
          {saving ? "Saving…" : "Submit inquiry"}
        </button>
      </div>
      {ready ? (
        <div className="ready-panel" role="status">
          <p>
            {savedNote ||
              `Your inquiry is ready. Open email or WhatsApp to reach ${agency.email}.`}
          </p>
          <div className="form-actions">
            <a className="btn" href={mailto}>
              Open email
            </a>
            <a className="btn btn-ghost" href={whatsapp} target="_blank" rel="noopener noreferrer">
              Open WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  optional,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
}) {
  return (
    <label className={error ? "field has-error" : "field"} htmlFor={id}>
      <span>
        {label}
        {optional ? <em> optional</em> : null}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <span className="error" id={`${id}-error`}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
