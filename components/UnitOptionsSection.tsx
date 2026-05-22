"use client";

import { useState } from "react";
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function UnitOptionsSection() {
  // State untuk melacak gambar yang aktif di Unit Subsidi
  const [activeSubsidiImg, setActiveSubsidiImg] = useState(0);

  const subsidiImages = [
    "/images/rumah_subsidi_1.png",
    "/images/rumah_subsidi_2.jpg",
  ];

  return (
    <section id="pilihan-unit" className="w-full py-24 px-4 bg-white flex flex-col items-center justify-center">
      {/* Section Header */}
      <div className="max-w-7xl w-full text-center lg:text-left mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div className="max-w-2xl">
          <span className="inline-block bg-[#92F7C3] text-[#00734D] rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-3">
            Tipe Hunian
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary leading-tight">
            Pilihan Unit <br className="hidden md:block"/>
            <span className="text-primary-light italic font-medium">Bumi Pasanggrahan</span>
          </h2>
        </div>
        <p className="text-foreground/80 max-w-md lg:text-right font-body text-base">
          Kami menawarkan tipe hunian yang dirancang secara detail untuk kenyamanan keluarga Anda. Tersedia pilihan Subsidi Pemerintah dan Komersil Premium.
        </p>
      </div>

      {/* Grid Container: Desktop Side-by-Side, Mobile Stacked Vertically */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* === CARD 1: RUMAH SUBSIDI === */}
        <div className="flex flex-col bg-surface-low rounded-[3rem] p-8 md:p-10 shadow-[0_20px_40px_rgba(26,26,26,0.02)] border border-outline-variant/10 transition-transform duration-300 hover:scale-[1.01]">
          {/* Tag Status */}
          <div className="flex items-center justify-between mb-6">
            <span className="bg-[#92F7C3] text-[#00734D] rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
              SUBSIDI PEMERINTAH
            </span>
            <span className="text-xs font-bold text-primary font-mono bg-white/60 px-3 py-1 rounded-lg">
              Tipe 36/60
            </span>
          </div>

          {/* Interactive Image Container */}
          <div className="relative w-full aspect-[1.5/1] rounded-[2rem] overflow-hidden mb-6 group shadow-md bg-white">
            <Image
              src={subsidiImages[activeSubsidiImg]}
              alt="Rumah Subsidi Bumi Pasanggrahan"
              fill
              className="object-cover transition-all duration-700 ease-out scale-100 group-hover:scale-103"
            />
            
            {/* Visual Indicator of multiple images */}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-semibold">
              Foto {activeSubsidiImg + 1} dari {subsidiImages.length}
            </div>
          </div>

          {/* Image Thumbnail Selector (Switcher) */}
          <div className="flex gap-3 mb-6">
            {subsidiImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveSubsidiImg(index)}
                className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                  activeSubsidiImg === index ? "border-primary scale-105 shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail Subsidi ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Content Info */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-2xl font-display font-bold text-foreground mb-3">Rumah Subsidi Minimalis</h3>
            <p className="text-foreground/80 font-body text-sm leading-relaxed mb-6">
              Miliki rumah pertama Anda dengan program subsidi pemerintah. Konstruksi kokoh dengan desain modern berkonsep ramah lingkungan. DP sangat terjangkau dengan proses KPR yang dibantu sampai akad selesai.
            </p>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-4 bg-white/50 backdrop-blur-sm p-5 rounded-2xl mb-8 border border-outline-variant/10">
              <div>
                <span className="block text-[10px] uppercase font-bold text-foreground/50 tracking-wider">Cicilan Mulai</span>
                <span className="text-base font-bold text-primary">Rp 1.1 Juta / bln</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-foreground/50 tracking-wider">Sertifikat</span>
                <span className="text-base font-bold text-foreground">SHM + PBG</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-foreground/50 tracking-wider">Kamar Tidur</span>
                <span className="text-base font-bold text-foreground">2 Ruang</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-foreground/50 tracking-wider">Kamar Mandi</span>
                <span className="text-base font-bold text-foreground">1 Ruang</span>
              </div>
            </div>

            {/* CTA Button */}
            <WhatsAppButton
              label="Tanya Unit Subsidi"
              message="Halo Bumi Pasanggrahan, saya tertarik dengan unit Rumah Subsidi Tipe 36/60. Bisa minta info lebih lanjut?"
              className="mt-auto w-full"
            />
          </div>
        </div>

        {/* === CARD 2: RUMAH KOMERSIL === */}
        <div className="flex flex-col bg-surface-low rounded-[3rem] p-8 md:p-10 shadow-[0_20px_40px_rgba(26,26,26,0.02)] border border-outline-variant/10 transition-transform duration-300 hover:scale-[1.01]">
          {/* Tag Status */}
          <div className="flex items-center justify-between mb-6">
            <span className="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
              KOMERSIL EKSKLUSIF
            </span>
            <span className="text-xs font-bold text-primary font-mono bg-white/60 px-3 py-1 rounded-lg">
              Tipe 45/84 (2 Lantai)
            </span>
          </div>

          {/* Image Container */}
          <div className="relative w-full aspect-[1.5/1] rounded-[2rem] overflow-hidden mb-6 group shadow-md bg-white">
            <Image
              src="/images/rumah_komersil.jpg"
              alt="Rumah Komersil Bumi Pasanggrahan"
              fill
              className="object-cover transition-all duration-700 ease-out scale-100 group-hover:scale-103"
            />
          </div>

          {/* Placeholder/spacing to align with the Subsidi switcher thumbnails */}
          <div className="h-14 mb-6 hidden lg:block"></div>

          {/* Content Info */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-2xl font-display font-bold text-foreground mb-3">Rumah Komersil Mewah</h3>
            <p className="text-foreground/80 font-body text-sm leading-relaxed mb-6">
              Didesain dengan kemewahan klasik modern 2 lantai untuk keluarga mapan. Memiliki struktur bangunan kokoh premium, halaman belakang lebih luas, serta area ruang tamu dan keluarga beratap tinggi (high ceiling) untuk sirkulasi udara optimal.
            </p>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-4 bg-white/50 backdrop-blur-sm p-5 rounded-2xl mb-8 border border-outline-variant/10">
              <div>
                <span className="block text-[10px] uppercase font-bold text-foreground/50 tracking-wider">Cicilan Mulai</span>
                <span className="text-base font-bold text-primary">Rp 2.5 Juta / bln</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-foreground/50 tracking-wider">Sertifikat</span>
                <span className="text-base font-bold text-foreground">SHM + PBG Ready</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-foreground/50 tracking-wider">Kamar Tidur</span>
                <span className="text-base font-bold text-foreground">3 Ruang</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-foreground/50 tracking-wider">Kamar Mandi</span>
                <span className="text-base font-bold text-foreground">2 Ruang</span>
              </div>
            </div>

            {/* CTA Button */}
            <WhatsAppButton
              label="Tanya Unit Komersil"
              message="Halo Bumi Pasanggrahan, saya tertarik dengan unit Rumah Komersil Tipe 45/84. Bisa minta info lebih lanjut?"
              className="mt-auto w-full"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
