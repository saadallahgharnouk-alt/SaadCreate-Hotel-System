"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import CardSkeleton from "../Components/Loading/CardSkeleton";
import { BedDouble, Wifi, Star } from "../Components/lucide-react";

const FILTERS = ["All", "Single", "Double", "Suite", "Extended"];

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_SERVER_URL || "https://edhotelserver.vercel.app";
        const res = await axios.get(`${API_URL}/api/rooms`);
        setRooms(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const visible = useMemo(
    () => (filter === "All" ? rooms : rooms.filter((r) => r.type === filter)),
    [filter, rooms]
  );

  return (
    <section id="rooms" className="section bg-brand-cream">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="eyebrow mb-4">Our Suites</span>
          <h2 className="font-display text-4xl md:text-5xl text-brand-navy leading-tight">
            Rooms crafted for{" "}
            <span className="text-gold-gradient italic">slow mornings</span>
          </h2>
          <p className="text-brand-navy/60 mt-5">
            Every room is a chapter in our story &mdash; choose the one that fits yours.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-xs md:text-sm tracking-[0.25em] uppercase transition-all duration-300 border ${
                  active
                    ? "bg-brand-navy text-brand-gold-light border-brand-navy shadow-lux"
                    : "text-brand-navy/70 border-brand-navy/15 hover:border-brand-gold hover:text-brand-navy"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
          ) : visible.length === 0 ? (
            <div className="col-span-full text-center py-16 text-brand-navy/50">
              No rooms match this filter yet.
            </div>
          ) : (
            visible.map((room) => (
              <article
                key={room._id}
                className="card-lux overflow-hidden group"
              >
                <Link href={`/Rooms/${room._id}`} className="block relative h-64">
                  <Image
                    src={room.imageUrl}
                    alt={room.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-navy/80 backdrop-blur text-[10px] uppercase tracking-[0.3em] text-brand-gold-light border border-brand-gold/30">
                    {room.type || "Suite"}
                  </span>
                  <span className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-gold-shine text-brand-navy font-semibold text-sm shadow-gold">
                    ${room.prix} / night
                  </span>
                </Link>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-xl text-brand-navy line-clamp-1">
                      {room.name}
                    </h3>
                    <div className="flex gap-0.5 text-brand-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-brand-navy/60 line-clamp-2 min-h-[2.5rem] mb-5">
                    {room.description ||
                      "A refined retreat with thoughtful details and timeless comfort."}
                  </p>

                  <div className="flex items-center gap-5 text-xs text-brand-navy/70 mb-6">
                    <span className="inline-flex items-center gap-1.5">
                      <BedDouble size={16} className="text-brand-gold" />
                      {room.capacity || 2} Beds
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Wifi size={16} className="text-brand-gold" />
                      Fast Wi-Fi
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-5 border-t border-brand-navy/10">
                    <Link
                      href={`/Rooms/${room._id}`}
                      className="flex-1 text-center py-2.5 rounded-full border border-brand-navy/20 text-brand-navy text-xs uppercase tracking-[0.25em] hover:bg-brand-navy hover:text-brand-gold-light transition"
                    >
                      View detail
                    </Link>
                    <Link
                      href={`/Rooms/${room._id}`}
                      className="flex-1 text-center py-2.5 rounded-full bg-brand-navy text-brand-gold-light text-xs uppercase tracking-[0.25em] hover:bg-gold-shine hover:text-brand-navy transition"
                    >
                      Book now
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Rooms;
