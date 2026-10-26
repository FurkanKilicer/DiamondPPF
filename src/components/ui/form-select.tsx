"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils/cn";

type Option = { value: string; label: string };

function toOptions(options: readonly string[] | readonly Option[]): Option[] {
  return options.map((item) => (typeof item === "string" ? { value: item, label: item } : item));
}

export function FormSelect({
  id,
  name,
  required,
  placeholder,
  options,
  value: valueProp,
  onChange,
}: {
  id: string;
  name: string;
  required?: boolean;
  placeholder: string;
  options: readonly string[] | readonly Option[];
  value?: string;
  onChange?: (value: string) => void;
}) {
  const listId = useId();
  const items = useMemo(() => toOptions(options), [options]);
  const [open, setOpen] = useState(false);
  const [uncontrolled, setUncontrolled] = useState("");
  const [active, setActive] = useState(0);
  const [menuBox, setMenuBox] = useState({ top: 0, left: 0, width: 0, maxHeight: 280 });
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const value = valueProp ?? uncontrolled;
  const selected = items.find((item) => item.value === value);

  function pick(next: string) {
    if (valueProp === undefined) setUncontrolled(next);
    onChange?.(next);
    setOpen(false);
  }

  function updateMenuBox() {
    const node = rootRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom - 12;
    const spaceAbove = rect.top - 12;
    const openUp = spaceBelow < 220 && spaceAbove > spaceBelow;
    const maxHeight = Math.min(320, Math.max(160, openUp ? spaceAbove : spaceBelow));
    setMenuBox({
      width: rect.width,
      left: rect.left,
      top: openUp ? rect.top - maxHeight - 6 : rect.bottom + 6,
      maxHeight,
    });
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    updateMenuBox();
    const selectedIndex = Math.max(0, items.findIndex((item) => item.value === value));
    setActive(selectedIndex);

    function onPointer(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    }

    function onReposition() {
      updateMenuBox();
    }

    document.addEventListener("mousedown", onPointer);
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [open, items, value]);

  useEffect(() => {
    if (!open) return;
    const node = menuRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    node?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Tab") {
      setOpen(false);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) {
        const item = items[active];
        if (item) pick(item.value);
      } else {
        setOpen(true);
      }
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const delta = event.key === "ArrowDown" ? 1 : -1;
      setActive((prev) => (prev + delta + items.length) % items.length);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      setActive(items.length - 1);
    }
  }

  const menu =
    mounted && open
      ? createPortal(
          <ul
            ref={menuRef}
            id={listId}
            role="listbox"
            aria-labelledby={id}
            style={{
              top: menuBox.top,
              left: menuBox.left,
              width: menuBox.width,
              maxHeight: menuBox.maxHeight,
            }}
            className="fixed z-[80] overflow-y-auto rounded-xl border border-white/10 bg-surface-elevated py-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.45)]"
          >
            {items.map((item, index) => {
              const isSelected = item.value === value;
              const isActive = index === active;
              return (
                <li key={item.value} role="presentation">
                  <button
                    type="button"
                    role="option"
                    data-index={index}
                    aria-selected={isSelected}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => pick(item.value)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-[14px] transition-colors",
                      isActive ? "bg-white/10 text-text-primary" : "text-text-secondary",
                      isSelected && "text-text-primary",
                    )}
                  >
                    <span>{item.label}</span>
                    {isSelected ? <Icon name="check" className="text-[16px] text-brand-red" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body,
        )
      : null;

  return (
    <div ref={rootRef} className="relative">
      <input
        tabIndex={-1}
        aria-hidden
        required={required}
        name={name}
        value={value}
        onChange={() => undefined}
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={onKeyDown}
        className={cn("form-field flex items-center justify-between gap-3 text-left", open && "border-brand-red")}
      >
        <span className={cn("truncate", selected ? "text-text-primary" : "text-text-muted")}>
          {selected?.label ?? placeholder}
        </span>
        <Icon
          name="expand_more"
          className={cn(
            "shrink-0 text-[20px] text-text-muted transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      {menu}
    </div>
  );
}
