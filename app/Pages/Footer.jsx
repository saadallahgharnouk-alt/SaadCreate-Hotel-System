"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "../Components/lucide-react";
import { useSiteContent } from "../hooks/useSiteContent";

function Footer() {
  const { content } = useSiteContent();
  const brand = content?.brand || {};
  const contact = content?.contact || {};
  const logoSrc = brand.logoWhite || brand.logo || "/Images/saadcreate_logo.svg";
  const brandName = brand.name || "SaadCreate Hotel";

  return (
    <footer className="bg-brand-navy text-brand-ivory border-t border-brand-gold/20">
      <div className="container-x px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid lg:grid-cols-4 gap-12">
        {/* Brand column */}
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-3 mb-5">
            <Image src={logoSrc} alt={`${brandName} logo`} width={56} height={56} />
            <span className="font-display text-2xl text-gold-gradient font-semibold">
              {brandName}
            </span>
          </Link>
          <p className="text-brand-ivory/70 max-w-md leading-relaxed">
            {brand.tagline ||
              "A sanctuary for travellers who seek both comfort and craft, wrapped in quiet luxury."}
          </p>

          <div className="mt-8 space-y-3 text-sm">
            {contact.address && (
              <div className="flex items-start gap-3 text-brand-ivory/80">
                <MapPin size={18} className="text-brand-gold mt-0.5" />
                <span>{contact.address}</span>
              </div>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 text-brand-ivory/80 hover:text-brand-gold-light transition"
              >
                <Phone size={18} className="text-brand-gold" />
                {contact.phone}
              </a>
            )}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-brand-ivory/80 hover:text-brand-gold-light transition"
              >
                <Mail size={18} className="text-brand-gold" />
                {contact.email}
              </a>
            )}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-display text-lg text-brand-gold-light mb-5">Explore</h4>
          <ul className="space-y-3 text-sm text-brand-ivory/70">
            {["Home", "About", "Services", "Rooms", "Booking", "Contact"].map((n) => (
              <li key={n}>
                <Link
                  href={n === "Home" ? "/" : `/${n}`}
                  className="hover:text-brand-gold-light transition"
                >
                  {n}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Stay in touch */}
        <div>
          <h4 className="font-display text-lg text-brand-gold-light mb-5">Stay in Touch</h4>
          <p className="text-sm text-brand-ivory/60 mb-4">
            Subscribe for private offers and seasonal collections.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center bg-white/5 border border-brand-gold/20 rounded-full overflow-hidden"
          >
            <input
              type="email"
              placeholder="you@elegance.com"
              className="flex-1 bg-transparent px-4 py-3 text-sm placeholder:text-brand-ivory/40 focus:outline-none"
            />
            <button className="px-5 py-3 text-xs uppercase tracking-[0.25em] text-brand-navy bg-gold-shine hover:shadow-gold transition">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-brand-ivory/50">
          <p>
            &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          <p className="tracking-widest uppercase">
            Crafted with care &bull; Hospitality since 1999
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
