"use client";

import { useState } from "react";

function phoneDigits(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("90")) digits = digits.slice(2);
  if (digits.startsWith("5")) digits = `0${digits}`;
  return digits.slice(0, 11);
}

export function formatTrPhone(raw: string) {
  const digits = phoneDigits(raw);
  const parts = [digits.slice(0, 4), digits.slice(4, 7), digits.slice(7, 9), digits.slice(9, 11)].filter(Boolean);
  return parts.join(" ");
}

export function FormPhone({
  id,
  name,
  required,
  placeholder = "05XX XXX XX XX",
}: {
  id: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  const [value, setValue] = useState("");

  return (
    <input
      id={id}
      name={name}
      type="tel"
      inputMode="numeric"
      autoComplete="tel"
      required={required}
      placeholder={placeholder}
      value={value}
      maxLength={14}
      pattern="05[0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}"
      title="05XX XXX XX XX"
      onChange={(event) => setValue(formatTrPhone(event.target.value))}
      className="form-field"
    />
  );
}
