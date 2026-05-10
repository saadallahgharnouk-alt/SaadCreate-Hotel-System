"use client";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { LogOut, Menu, X, User } from "../Components/lucide-react";
import Image from "next/image";
import { MyContext } from "../context/Mycontext";
import { useSiteContent } from "../hooks/useSiteContent";

const NAV = ["Home", "About", "Services", "Rooms", "Booking", "Contact"];

function Header({ page }) {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isLoggingOut } = useContext(MyContext);
  const { content } = useSiteContent();
  const brand = content?.brand || {};
  const logoSrc = brand.logoWhite || brand.logo || "/Images/saadcreate_logo.svg";
  const brandName = brand.name || "SaadCreate Hotel";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-brand-navy/95 backdrop-blur-md shadow-lux border-b border-brand-gold/20"
          : "bg-brand-navy/70 backdrop-blur-sm border-b border-white/10"
      }`}
    >
      <div className="container-x px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src={logoSrc}
              alt={`${brandName} logo`}
              width={52}
              height={52}
              className="transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_6px_20px_rgba(200,163,90,0.35)]"
            />
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-xl tracking-wide text-gold-gradient font-semibold">
                {brandName}
              </span>
              <span className="text-[10px] tracking-[0.35em] uppercase text-brand-ivory/60">
                Luxury &bull; Stay
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-10 text-sm font-medium">
            {NAV.map((item) => {
              const active = page === item;
              return (
                <li key={item} className="relative group">
                  <Link
                    href={item === "Home" ? "/" : `/${item}`}
                    className={`tracking-[0.15em] uppercase transition-colors duration-300 ${
                      active ? "text-brand-gold-light" : "text-brand-ivory/80 hover:text-brand-gold-light"
                    }`}
                  >
                    {item}
                  </Link>
                  <span
                    className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent transition-all duration-500 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </li>
              );
            })}
          </ul>

          {/* Auth (desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  href="/auth/Login"
                  className="px-5 py-2 text-sm tracking-wide uppercase text-brand-ivory/90 hover:text-brand-gold-light transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/Register"
                  className="btn-gold !px-6 !py-2.5 text-sm"
                >
                  Reserve
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3 bg-white/5 border border-brand-gold/20 px-3 py-1.5 rounded-full">
                <div className="w-8 h-8 rounded-full bg-gold-shine flex items-center justify-center text-brand-navy font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User size={14} />}
                </div>
                <span className="text-sm text-brand-ivory">{user.name}</span>
                {user.role === "admin" && (
                  <Link
                    href="/Admin"
                    className="text-xs uppercase tracking-widest text-brand-gold-light border border-brand-gold/40 rounded-full px-2 py-0.5 hover:bg-brand-gold hover:text-brand-navy transition"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  disabled={isLoggingOut}
                  className="p-1.5 rounded-full text-brand-ivory/70 hover:text-red-300 hover:bg-red-500/10 transition"
                  title="Logout"
                >
                  {isLoggingOut ? (
                    <div className="w-4 h-4 border-2 border-red-300 border-t-transparent animate-spin rounded-full" />
                  ) : (
                    <LogOut size={16} />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenu(!menu)}
            className="lg:hidden p-2 text-brand-ivory hover:text-brand-gold-light transition"
            aria-label="Toggle menu"
          >
            {menu ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute left-0 right-0 top-full bg-brand-navy border-b border-brand-gold/20 shadow-lux transition-all duration-500 overflow-hidden ${
          menu ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-6 py-8 space-y-1">
          {NAV.map((item) => {
            const active = page === item;
            return (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item}`}
                onClick={() => setMenu(false)}
                className={`block py-3 text-sm uppercase tracking-[0.25em] border-b border-white/5 ${
                  active ? "text-brand-gold-light" : "text-brand-ivory/80 hover:text-brand-gold-light"
                }`}
              >
                {item}
              </Link>
            );
          })}

          <div className="pt-6 space-y-3">
            {!user ? (
              <>
                <Link
                  onClick={() => setMenu(false)}
                  href="/auth/Login"
                  className="block w-full py-3 text-center text-brand-ivory border border-brand-ivory/30 rounded-full hover:border-brand-gold hover:text-brand-gold-light transition"
                >
                  Sign in
                </Link>
                <Link
                  onClick={() => setMenu(false)}
                  href="/auth/Register"
                  className="btn-gold w-full"
                >
                  Reserve
                </Link>
              </>
            ) : (
              <div className="flex items-center justify-between gap-3 bg-white/5 border border-brand-gold/20 px-4 py-3 rounded-full">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold-shine flex items-center justify-center text-brand-navy font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                  </div>
                  <span className="text-brand-ivory">{user.name}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMenu(false);
                  }}
                  disabled={isLoggingOut}
                  className="text-red-300/80 hover:text-red-200"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}

            {user?.role === "admin" && (
              <Link
                href="/Admin"
                onClick={() => setMenu(false)}
                className="block w-full py-3 text-center text-brand-gold-light border border-brand-gold rounded-full hover:bg-brand-gold hover:text-brand-navy transition uppercase tracking-widest text-xs"
              >
                Admin Panel
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
