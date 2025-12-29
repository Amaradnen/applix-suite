"use client";

import { useMemo, useState } from "react";
import CardPreview from "@/components/nfc/CardPreview";
import ProfilePreview from "@/components/nfc/ProfilePreview";
import { cardTemplates, profileTemplates, type CardMaterial, type CardTemplateKey, type ProfileTemplateKey } from "@/components/nfc/templates";

export default function NFCStudio() {
  const [material, setMaterial] = useState<CardMaterial>("metal-black");
  const [cardTpl, setCardTpl] = useState<CardTemplateKey>("minimal");
  const [profileTpl, setProfileTpl] = useState<ProfileTemplateKey>("creator");

  const [name, setName] = useState("SAMI B.");
  const [title, setTitle] = useState("FOUNDER • APPLIX");
  const [bio, setBio] = useState("Tap my card to connect. Golden Gemini edition.");
  const slug = useMemo(() => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "demo", [name]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="text-gold text-xs font-bold tracking-widest">APPLIX NFC STUDIO</div>
            <h2 className="text-4xl font-display font-bold mt-2">Builder (sans login)</h2>
            <p className="text-white/60 mt-2">Choisis un template, modifie les champs, et partage ton lien /u/{slug}.</p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10">
            <div className="text-xs font-bold tracking-widest text-white/50 mb-3 uppercase">Matériau</div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { k: "metal-black", label: "Métal Noir" },
                { k: "metal-gold", label: "Métal Or" },
                { k: "pvc-white", label: "PVC Blanc" }
              ].map((m) => (
                <button
                  key={m.k}
                  onClick={() => setMaterial(m.k as CardMaterial)}
                  className={[
                    "rounded-xl p-3 border text-xs font-bold transition",
                    material === m.k ? "border-gold/50 bg-white/5" : "border-white/10 bg-black/20 hover:border-gold/30"
                  ].join(" ")}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10">
            <div className="text-xs font-bold tracking-widest text-white/50 mb-3 uppercase">Template Carte</div>
            <div className="grid grid-cols-2 gap-3">
              {cardTemplates.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setCardTpl(t.key)}
                  className={[
                    "rounded-xl p-3 border text-left transition",
                    cardTpl === t.key ? "border-gold/50 bg-white/5" : "border-white/10 bg-black/20 hover:border-gold/30"
                  ].join(" ")}
                >
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="text-[11px] text-white/50 mt-1">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10">
            <div className="text-xs font-bold tracking-widest text-white/50 mb-3 uppercase">Champs (inside)</div>
            <div className="grid grid-cols-1 gap-3">
              <label className="text-xs text-white/50">
                Nom
                <input
                  className="mt-1 w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-gold/40"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="text-xs text-white/50">
                Titre / Poste
                <input
                  className="mt-1 w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-gold/40"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label className="text-xs text-white/50">
                Bio (profil)
                <textarea
                  className="mt-1 w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-gold/40 min-h-[90px]"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-gold/20">
            <div className="text-xs font-bold tracking-widest text-gold mb-3 uppercase">Template Profil</div>
            <div className="grid grid-cols-2 gap-3">
              {profileTemplates.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setProfileTpl(t.key)}
                  className={[
                    "rounded-xl p-3 border text-left transition",
                    profileTpl === t.key ? "border-gold/50 bg-white/5" : "border-white/10 bg-black/20 hover:border-gold/30"
                  ].join(" ")}
                >
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="text-[11px] text-white/50 mt-1">{t.desc}</div>
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <a className="text-xs font-bold text-black bg-gold px-3 py-2 rounded-xl" href={`/u/${slug}`} target="_blank">
                Ouvrir /u/{slug}
              </a>
              <button
                className="text-xs font-bold text-white bg-white/5 border border-white/10 px-3 py-2 rounded-xl hover:bg-white/10 transition"
                onClick={() => {
                  navigator.clipboard?.writeText(`${location.origin}/u/${slug}`);
                  alert("Lien copié ✅");
                }}
              >
                Copier lien
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 grid md:grid-cols-2 gap-8 items-start">
          <div className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col items-center">
            <div className="text-xs font-bold tracking-widest text-white/50 mb-5 uppercase">Prévisualisation Carte</div>
            <CardPreview material={material} template={cardTpl} name={name} title={title} slug={slug} />
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/10">
            <div className="text-xs font-bold tracking-widest text-white/50 mb-5 uppercase">Prévisualisation Profil</div>
            <div className="w-full max-w-[320px] mx-auto h-[620px] rounded-[42px] border-[10px] border-white/10 bg-black shadow-2xl overflow-hidden">
              <div className="h-full bg-white">
                <ProfilePreview template={profileTpl} name={name} bio={bio} slug={slug} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
