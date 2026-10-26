"use client";

import { useState } from "react";

export function formatPersonName(raw: string) {
  return raw.replace(/\d/g, "");
}

export function FormName({
  id,
  name,
  required,
  placeholder = "Adınız Soyadınız",
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
      type="text"
      autoComplete="name"
      inputMode="text"
      required={required}
      placeholder={placeholder}
      value={value}
      pattern="[^0-9]+"
      title="Ad soyad rakam içeremez"
      onChange={(event) => setValue(formatPersonName(event.target.value))}
      className="form-field"
    />
  );
}
