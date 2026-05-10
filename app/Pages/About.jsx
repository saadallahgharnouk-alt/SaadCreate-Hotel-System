"use client";
import React from "react";
import Image from "next/image";
import { useSiteContent } from "../hooks/useSiteContent";

function About() {
  const { content } = useSiteContent();
  const about = content?.about || {};
  const paragraphs = about.paragraphs?.length ? about.paragraphs : [];
  const stats = about.stats?.length ? about.stats : [];
  const image = about.image || "/about-1.jpg";
  const imageSecondary = about.imageSecondary || "/about-2.jpg";

  return (
    <section id="about" className="section bg-brand-cream">
      <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
        {/* Images */}
        <div className="relative">
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lux">
            <Image
              src={image}
              alt={about.title || "About SaadCreate Hotel"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="hidden md:block absolute -bottom-10 -right-6 w-2/3 aspect-[4/3] rounded-[1.5rem] overflow-hidden border-4 border-brand-cream shadow-lux">
            <Image
              src={imageSecondary}
              alt="SaadCreate Hotel interior"
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>

          <div className="hidden md:flex absolute -top-6 -left-6 bg-brand-navy text-brand-ivory rounded-2xl p-5 shadow-lux items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gold-shine flex items-center justify-center text-brand-navy font-display text-xl">
              {(stats[0]?.value || "25").toString().charAt(0)}
            </div>
            <div className="leading-tight">
              <p className="font-display text-lg text-gold-gradient">
                {stats[0]?.value || "25+"}
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-brand-ivory/70">
                {stats[0]?.label || "Years of hospitality"}
              </p>
            </div>
          </div>
        </div>

        {/* Text */}
        <div>
          <span className="eyebrow mb-5">
            {about.eyebrow || "About the House"}
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-brand-navy leading-tight mb-8">
            {about.title || "A legacy of"}{" "}
            <span className="text-gold-gradient italic">
              {about.highlight || "refined hospitality"}
            </span>
          </h2>

          <div className="space-y-5 text-brand-navy/75 leading-relaxed text-base md:text-[17px]">
            {paragraphs.length ? (
              paragraphs.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <p>Welcome to SaadCreate Hotel, where every stay is designed around you.</p>
            )}
          </div>

          {stats.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-brand-navy/10">
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="font-display text-3xl md:text-4xl text-gold-gradient">
                    {s.value}
                  </p>
                  <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-brand-navy/60 mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;
