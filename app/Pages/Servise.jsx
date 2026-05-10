"use client";
import React from "react";
import {
  Bike,
  Cake,
  Dumbbell,
  School,
  Spade,
  Utensils,
} from "../Components/lucide-react";
import { useSiteContent } from "../hooks/useSiteContent";

const ICONS = {
  school: School,
  utensils: Utensils,
  spade: Spade,
  bike: Bike,
  cake: Cake,
  dumbbell: Dumbbell,
};

function Servise() {
  const { content } = useSiteContent();
  const svc = content?.services || {};
  const items = svc.items?.length ? svc.items : [];

  return (
    <section id="services" className="section bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(circle_at_top_left,#C8A35A_0%,transparent_40%),radial-gradient(circle_at_bottom_right,#C8A35A_0%,transparent_40%)]" />
      <div className="container-x relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow !text-brand-gold-light mb-4">
            {svc.eyebrow || "Experiences"}
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-brand-ivory leading-tight">
            {svc.title || "Curated for"}{" "}
            <span className="text-gold-gradient italic">
              {svc.highlight || "every desire"}
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => {
            const Icon = ICONS[it.icon] || School;
            return (
              <div
                key={it.id || i}
                className="group relative p-10 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-brand-gold/60 hover:bg-white/[0.06] transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-brand-gold/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-brand-gold/15 text-brand-gold-light flex items-center justify-center mb-6 group-hover:bg-gold-shine group-hover:text-brand-navy transition-all duration-500">
                    <Icon size={26} />
                  </div>
                  <h3 className="font-display text-xl text-brand-ivory mb-3">
                    {it.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-ivory/60">
                    {it.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-brand-gold-light/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Discover
                    <span className="block w-8 h-px bg-brand-gold-light/80" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Servise;
