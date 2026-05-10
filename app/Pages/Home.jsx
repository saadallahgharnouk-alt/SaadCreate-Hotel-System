"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "../Components/lucide-react";
import { useSiteContent } from "../hooks/useSiteContent";

const FALLBACK_SLIDES = [
  {
    id: "fallback-1",
    image: "/carousel-1.jpg",
    eyebrow: "Welcome to SaadCreate",
    title: "A sanctuary of",
    highlight: "timeless luxury",
    subtitle: "Discover a stay where elegance meets serenity.",
  },
];

function Home() {
  const { content } = useSiteContent();
  const slides =
    content?.hero?.slides && content.hero.slides.length > 0
      ? content.hero.slides
      : FALLBACK_SLIDES;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      6500
    );
    return () => clearInterval(t);
  }, [slides.length]);

  useEffect(() => {
    if (current >= slides.length) setCurrent(0);
  }, [slides.length, current]);

  const go = (i) => setCurrent(((i % slides.length) + slides.length) % slides.length);

  return (
    <section className="relative w-full h-[92vh] min-h-[640px] overflow-hidden bg-brand-navy">
      {slides.map((s, i) => (
        <div
          key={s.id || i}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="absolute inset-0">
            <Image
              src={s.image}
              alt={s.title || `Slide ${i + 1}`}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover transition-transform duration-[12000ms] ease-linear ${
                i === current ? "scale-[1.08]" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 via-brand-navy/30 to-brand-navy/90" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,27,43,0.6)_100%)]" />
          </div>

          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 md:px-20 z-20 max-w-6xl mx-auto">
            <span
              className={`eyebrow !text-brand-gold-light mb-6 transition-all duration-1000 delay-100 ${
                i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {s.eyebrow || "Welcome"}
            </span>

            <h1
              className={`font-display font-bold text-brand-ivory text-4xl sm:text-6xl md:text-7xl leading-[1.05] mb-6 transition-all duration-1000 delay-300 ${
                i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="block">{s.title}</span>
              {s.highlight && (
                <span className="block text-gold-gradient italic font-normal">
                  {s.highlight}
                </span>
              )}
            </h1>

            <div
              className={`w-24 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent mb-8 transition-all duration-1000 delay-500 ${
                i === current ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
            />

            {s.subtitle && (
              <p
                className={`max-w-2xl text-brand-ivory/80 text-base md:text-lg leading-relaxed mb-10 transition-all duration-1000 delay-500 ${
                  i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                {s.subtitle}
              </p>
            )}

            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-700 ${
                i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <Link href="/Rooms" className="btn-gold">
                Explore our rooms
              </Link>
              <Link href="/Booking" className="btn-ghost">
                Book your stay
              </Link>
            </div>

            <div
              className={`flex items-center gap-2 mt-10 text-brand-ivory/70 text-xs tracking-[0.3em] uppercase transition-all duration-1000 delay-1000 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="flex gap-0.5 text-brand-gold">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} size={14} />
                ))}
              </span>
              <span>4.9 / 5 &bull; Five-star rated hospitality</span>
            </div>
          </div>
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button
            onClick={() => go(current - 1)}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-brand-ivory flex items-center justify-center hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => go(current + 1)}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-brand-ivory flex items-center justify-center hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight size={22} />
          </button>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-10 bg-brand-gold shadow-[0_0_20px_rgba(200,163,90,0.6)]"
                    : "w-4 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Home;
