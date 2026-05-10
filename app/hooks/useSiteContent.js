"use client";
import { useEffect, useState } from "react";

const FALLBACK = {
  brand: {
    name: "SaadCreate Hotel",
    tagline: "Luxury redefined, crafted for you.",
    logo: "/Images/saadcreate_logo.svg",
    logoWhite: "/Images/saadcreate_logo.svg",
  },
  hero: { slides: [] },
  about: { paragraphs: [], stats: [], image: "/about-1.jpg", imageSecondary: "/about-2.jpg" },
  services: { items: [] },
  contact: { address: "", phone: "", email: "" },
};

export function useSiteContent() {
  const [content, setContent] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/site-content", { cache: "no-store" });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data = await res.json();
        if (!cancelled) setContent(data);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { content, loading, error, setContent };
}
