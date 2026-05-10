"use client";
import React, { useEffect, useState, useContext, useRef } from "react";
import NextImage from "next/image";
import { MyContext } from "../../context/Mycontext";
import {
  Plus,
  Trash2,
  Upload,
  Save,
  ImageIcon,
} from "../../Components/lucide-react";

const ICON_OPTIONS = [
  "school",
  "utensils",
  "spade",
  "bike",
  "cake",
  "dumbbell",
];

function ASiteContent({ theme }) {
  const { toast } = useContext(MyContext);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("brand");

  const isDark = theme === "dark";
  const colors = {
    bg: isDark ? "bg-slate-900" : "bg-gray-50",
    card: isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200",
    text: isDark ? "text-white" : "text-gray-900",
    textSoft: isDark ? "text-gray-400" : "text-gray-600",
    input: isDark
      ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400"
      : "bg-white border-gray-300 text-gray-900",
    btnGhost: isDark
      ? "bg-slate-700 hover:bg-slate-600 text-white"
      : "bg-gray-100 hover:bg-gray-200 text-gray-800",
    subtle: isDark ? "bg-slate-800/60" : "bg-gray-50",
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/site-content", { cache: "no-store" });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data = await res.json();
        setContent(data);
      } catch (e) {
        toast?.error("Failed to load site content");
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [toast]);

  const updatePath = (path, value) => {
    setContent((prev) => {
      const next = structuredClone(prev);
      const parts = path.split(".");
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) {
        const k = parts[i];
        if (cur[k] === undefined) cur[k] = {};
        cur = cur[k];
      }
      cur[parts[parts.length - 1]] = value;
      return next;
    });
  };

  const save = async () => {
    if (!content) return;
    setSaving(true);
    try {
      const res = await fetch("/api/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const saved = await res.json();
      setContent(saved);
      toast?.success("Site content saved");
    } catch (e) {
      toast?.error("Failed to save");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Upload failed (${res.status})`);
    }
    const { url } = await res.json();
    return url;
  };

  if (loading || !content) {
    return (
      <div className={`p-8 min-h-screen ${colors.bg} ${colors.text}`}>
        <div className="animate-pulse">Loading site content&hellip;</div>
      </div>
    );
  }

  const TABS = [
    { id: "brand", label: "Brand & Logo", icon: "🏷️" },
    { id: "hero", label: "Hero Carousel", icon: "🎬" },
    { id: "about", label: "About", icon: "📖" },
    { id: "services", label: "Services", icon: "🔔" },
    { id: "contact", label: "Contact", icon: "📞" },
  ];

  return (
    <div className={`p-6 md:p-8 min-h-screen transition-colors ${colors.bg}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
            Site Content
          </h1>
          <p className={`text-sm mt-1 ${colors.textSoft}`}>
            Edit your logo, carousel, about section, services and contact details.
          </p>
          {content.updatedAt && (
            <p className={`text-xs mt-1 ${colors.textSoft}`}>
              Last updated {new Date(content.updatedAt).toLocaleString()}
            </p>
          )}
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold shadow-lg hover:shadow-orange-500/30 transition disabled:opacity-60"
        >
          {saving ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              tab === t.id
                ? "bg-orange-500 text-white shadow-lg"
                : colors.btnGhost
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="space-y-6">
        {tab === "brand" && (
          <BrandPanel
            brand={content.brand}
            onChange={(v) => updatePath("brand", v)}
            uploadImage={uploadImage}
            colors={colors}
            toast={toast}
          />
        )}

        {tab === "hero" && (
          <HeroPanel
            hero={content.hero}
            onChange={(v) => updatePath("hero", v)}
            uploadImage={uploadImage}
            colors={colors}
            toast={toast}
          />
        )}

        {tab === "about" && (
          <AboutPanel
            about={content.about}
            onChange={(v) => updatePath("about", v)}
            uploadImage={uploadImage}
            colors={colors}
            toast={toast}
          />
        )}

        {tab === "services" && (
          <ServicesPanel
            services={content.services}
            onChange={(v) => updatePath("services", v)}
            colors={colors}
          />
        )}

        {tab === "contact" && (
          <ContactPanel
            contact={content.contact}
            onChange={(v) => updatePath("contact", v)}
            colors={colors}
          />
        )}
      </div>
    </div>
  );
}

/* ---------- Field primitives ---------- */

function Field({ label, children, colors, hint }) {
  return (
    <div>
      <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${colors.textSoft}`}>
        {label}
      </label>
      {children}
      {hint && <p className={`mt-1 text-xs ${colors.textSoft}`}>{hint}</p>}
    </div>
  );
}

function TextInput({ value, onChange, colors, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value || ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${colors.input}`}
    />
  );
}

function TextArea({ value, onChange, colors, rows = 4, placeholder }) {
  return (
    <textarea
      rows={rows}
      value={value || ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${colors.input}`}
    />
  );
}

function ImageUploader({ value, onChange, uploadImage, colors, toast, label = "Image" }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
      toast?.success(`${label} uploaded`);
    } catch (err) {
      toast?.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div
        className={`relative rounded-xl border-2 border-dashed overflow-hidden min-h-[160px] flex items-center justify-center ${colors.subtle} ${
          colors.input.includes("slate") ? "border-slate-600" : "border-gray-300"
        }`}
      >
        {value ? (
          <NextImage
            src={value}
            alt={label}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className={`flex flex-col items-center gap-1 text-sm ${colors.textSoft}`}>
            <ImageIcon size={28} />
            <span>No image yet</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/path/to/image.jpg or https://…"
          className={`flex-1 px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${colors.input}`}
        />
        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-amber-500 text-white cursor-pointer hover:bg-amber-600 transition">
          {uploading ? (
            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Upload size={14} />
          )}
          {uploading ? "Uploading…" : "Upload"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFile}
          />
        </label>
      </div>
    </div>
  );
}

/* ---------- Panels ---------- */

function BrandPanel({ brand = {}, onChange, uploadImage, colors, toast }) {
  const patch = (key, value) => onChange({ ...brand, [key]: value });

  return (
    <div className={`rounded-2xl border p-6 ${colors.card}`}>
      <h2 className={`font-bold mb-5 ${colors.text}`}>Brand identity</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Field label="Brand name" colors={colors}>
            <TextInput
              value={brand.name}
              onChange={(v) => patch("name", v)}
              colors={colors}
              placeholder="SaadCreate Hotel"
            />
          </Field>
          <Field label="Tagline" colors={colors}>
            <TextInput
              value={brand.tagline}
              onChange={(v) => patch("tagline", v)}
              colors={colors}
              placeholder="Luxury redefined, crafted for you."
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Logo (dark bg)" colors={colors} hint="Used in header & footer">
            <ImageUploader
              value={brand.logoWhite || brand.logo}
              onChange={(url) => patch("logoWhite", url)}
              uploadImage={uploadImage}
              colors={colors}
              toast={toast}
              label="Logo"
            />
          </Field>
          <Field label="Primary logo" colors={colors} hint="Used on light surfaces & meta tags">
            <ImageUploader
              value={brand.logo}
              onChange={(url) => patch("logo", url)}
              uploadImage={uploadImage}
              colors={colors}
              toast={toast}
              label="Logo"
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

function HeroPanel({ hero = { slides: [] }, onChange, uploadImage, colors, toast }) {
  const slides = hero.slides || [];

  const setSlides = (next) => onChange({ ...hero, slides: next });

  const addSlide = () => {
    setSlides([
      ...slides,
      {
        id: `slide-${Date.now()}`,
        image: "",
        eyebrow: "",
        title: "New slide",
        highlight: "",
        subtitle: "",
      },
    ]);
  };

  const updateSlide = (idx, patch) => {
    const next = slides.map((s, i) => (i === idx ? { ...s, ...patch } : s));
    setSlides(next);
  };

  const removeSlide = (idx) => {
    if (!confirm("Remove this slide?")) return;
    setSlides(slides.filter((_, i) => i !== idx));
  };

  const move = (idx, dir) => {
    const next = [...slides];
    const swap = idx + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    setSlides(next);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className={`font-bold ${colors.text}`}>Hero carousel slides</h2>
        <button
          onClick={addSlide}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition"
        >
          <Plus size={16} /> Add slide
        </button>
      </div>

      {slides.length === 0 && (
        <div className={`rounded-2xl border p-10 text-center ${colors.card} ${colors.textSoft}`}>
          No slides yet. Click <strong>Add slide</strong> to create one.
        </div>
      )}

      {slides.map((s, idx) => (
        <div key={s.id || idx} className={`rounded-2xl border p-5 ${colors.card}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`text-sm font-semibold ${colors.text}`}>
              Slide #{idx + 1}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => move(idx, -1)}
                disabled={idx === 0}
                className={`p-1.5 rounded ${colors.btnGhost} disabled:opacity-40`}
                title="Move up"
              >
                ↑
              </button>
              <button
                onClick={() => move(idx, 1)}
                disabled={idx === slides.length - 1}
                className={`p-1.5 rounded ${colors.btnGhost} disabled:opacity-40`}
                title="Move down"
              >
                ↓
              </button>
              <button
                onClick={() => removeSlide(idx)}
                className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 transition"
                title="Delete slide"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Image" colors={colors}>
              <ImageUploader
                value={s.image}
                onChange={(v) => updateSlide(idx, { image: v })}
                uploadImage={uploadImage}
                colors={colors}
                toast={toast}
                label="Slide image"
              />
            </Field>

            <div className="space-y-3">
              <Field label="Eyebrow (small tag above title)" colors={colors}>
                <TextInput
                  value={s.eyebrow}
                  onChange={(v) => updateSlide(idx, { eyebrow: v })}
                  colors={colors}
                />
              </Field>
              <Field label="Title (first line)" colors={colors}>
                <TextInput
                  value={s.title}
                  onChange={(v) => updateSlide(idx, { title: v })}
                  colors={colors}
                />
              </Field>
              <Field label="Highlight (gold italic line)" colors={colors}>
                <TextInput
                  value={s.highlight}
                  onChange={(v) => updateSlide(idx, { highlight: v })}
                  colors={colors}
                />
              </Field>
              <Field label="Subtitle" colors={colors}>
                <TextArea
                  value={s.subtitle}
                  onChange={(v) => updateSlide(idx, { subtitle: v })}
                  rows={3}
                  colors={colors}
                />
              </Field>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AboutPanel({ about = {}, onChange, uploadImage, colors, toast }) {
  const patch = (key, value) => onChange({ ...about, [key]: value });

  const paragraphs = about.paragraphs || [];
  const setParas = (next) => patch("paragraphs", next);
  const updatePara = (i, v) => setParas(paragraphs.map((p, j) => (i === j ? v : p)));
  const addPara = () => setParas([...paragraphs, ""]);
  const removePara = (i) => setParas(paragraphs.filter((_, j) => i !== j));

  const stats = about.stats || [];
  const setStats = (next) => patch("stats", next);
  const updateStat = (i, k, v) =>
    setStats(stats.map((s, j) => (i === j ? { ...s, [k]: v } : s)));
  const addStat = () => setStats([...stats, { label: "", value: "" }]);
  const removeStat = (i) => setStats(stats.filter((_, j) => i !== j));

  return (
    <div className={`rounded-2xl border p-6 ${colors.card} space-y-6`}>
      <h2 className={`font-bold ${colors.text}`}>About section</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Field label="Eyebrow" colors={colors}>
            <TextInput value={about.eyebrow} onChange={(v) => patch("eyebrow", v)} colors={colors} />
          </Field>
          <Field label="Title" colors={colors}>
            <TextInput value={about.title} onChange={(v) => patch("title", v)} colors={colors} />
          </Field>
          <Field label="Highlight (gold italic)" colors={colors}>
            <TextInput
              value={about.highlight}
              onChange={(v) => patch("highlight", v)}
              colors={colors}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Primary image" colors={colors}>
            <ImageUploader
              value={about.image}
              onChange={(v) => patch("image", v)}
              uploadImage={uploadImage}
              colors={colors}
              toast={toast}
              label="About image"
            />
          </Field>
          <Field label="Secondary image" colors={colors}>
            <ImageUploader
              value={about.imageSecondary}
              onChange={(v) => patch("imageSecondary", v)}
              uploadImage={uploadImage}
              colors={colors}
              toast={toast}
              label="Secondary image"
            />
          </Field>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className={`text-sm font-semibold uppercase tracking-wider ${colors.textSoft}`}>
            Paragraphs
          </h3>
          <button
            onClick={addPara}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition"
          >
            <Plus size={14} /> Add paragraph
          </button>
        </div>
        <div className="space-y-3">
          {paragraphs.map((p, i) => (
            <div key={i} className="flex gap-2 items-start">
              <TextArea value={p} onChange={(v) => updatePara(i, v)} rows={3} colors={colors} />
              <button
                onClick={() => removePara(i)}
                className="p-2 mt-1 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className={`text-sm font-semibold uppercase tracking-wider ${colors.textSoft}`}>
            Stats (e.g. "25+ Years")
          </h3>
          <button
            onClick={addStat}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition"
          >
            <Plus size={14} /> Add stat
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <div key={i} className={`p-3 rounded-lg border ${colors.subtle} ${
              colors.input.includes("slate") ? "border-slate-700" : "border-gray-200"
            } space-y-2`}>
              <TextInput
                value={s.value}
                onChange={(v) => updateStat(i, "value", v)}
                placeholder="25+"
                colors={colors}
              />
              <TextInput
                value={s.label}
                onChange={(v) => updateStat(i, "label", v)}
                placeholder="Years of hospitality"
                colors={colors}
              />
              <button
                onClick={() => removeStat(i)}
                className="w-full text-xs py-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 transition inline-flex items-center justify-center gap-1"
              >
                <Trash2 size={12} /> Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesPanel({ services = { items: [] }, onChange, colors }) {
  const patch = (k, v) => onChange({ ...services, [k]: v });
  const items = services.items || [];
  const setItems = (next) => patch("items", next);

  const updateItem = (i, p) => setItems(items.map((it, j) => (i === j ? { ...it, ...p } : it)));
  const addItem = () =>
    setItems([
      ...items,
      {
        id: `svc-${Date.now()}`,
        icon: "school",
        name: "New service",
        description: "",
      },
    ]);
  const removeItem = (i) => {
    if (!confirm("Remove this service?")) return;
    setItems(items.filter((_, j) => i !== j));
  };

  return (
    <div className={`rounded-2xl border p-6 ${colors.card} space-y-5`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className={`font-bold ${colors.text}`}>Services</h2>
        <button
          onClick={addItem}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition"
        >
          <Plus size={16} /> Add service
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <Field label="Eyebrow" colors={colors}>
          <TextInput value={services.eyebrow} onChange={(v) => patch("eyebrow", v)} colors={colors} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Title" colors={colors}>
            <TextInput value={services.title} onChange={(v) => patch("title", v)} colors={colors} />
          </Field>
          <Field label="Highlight" colors={colors}>
            <TextInput
              value={services.highlight}
              onChange={(v) => patch("highlight", v)}
              colors={colors}
            />
          </Field>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((it, i) => (
          <div key={it.id || i} className={`p-4 rounded-xl border ${colors.subtle} ${
            colors.input.includes("slate") ? "border-slate-700" : "border-gray-200"
          } space-y-3`}>
            <div className="flex justify-between items-center">
              <span className={`text-xs uppercase tracking-wider font-semibold ${colors.textSoft}`}>
                Service #{i + 1}
              </span>
              <button
                onClick={() => removeItem(i)}
                className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 transition"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <Field label="Name" colors={colors}>
              <TextInput
                value={it.name}
                onChange={(v) => updateItem(i, { name: v })}
                colors={colors}
              />
            </Field>
            <Field label="Description" colors={colors}>
              <TextArea
                value={it.description}
                onChange={(v) => updateItem(i, { description: v })}
                rows={2}
                colors={colors}
              />
            </Field>
            <Field label="Icon" colors={colors}>
              <select
                value={it.icon || "school"}
                onChange={(e) => updateItem(i, { icon: e.target.value })}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${colors.input}`}
              >
                {ICON_OPTIONS.map((o) => (
                  <option key={o} value={o} className="text-gray-900">
                    {o}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPanel({ contact = {}, onChange, colors }) {
  const patch = (k, v) => onChange({ ...contact, [k]: v });
  return (
    <div className={`rounded-2xl border p-6 ${colors.card}`}>
      <h2 className={`font-bold mb-5 ${colors.text}`}>Contact details</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <Field label="Address" colors={colors}>
          <TextInput value={contact.address} onChange={(v) => patch("address", v)} colors={colors} />
        </Field>
        <Field label="Phone" colors={colors}>
          <TextInput value={contact.phone} onChange={(v) => patch("phone", v)} colors={colors} />
        </Field>
        <Field label="Email" colors={colors} hint="Shown in the footer and contact card.">
          <TextInput value={contact.email} onChange={(v) => patch("email", v)} colors={colors} type="email" />
        </Field>
      </div>
    </div>
  );
}

export default ASiteContent;
