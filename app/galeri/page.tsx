"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

interface GalleryItem {
  src: string;
  title: string;
  desc: string;
  category: "kegiatan" | "subsidi" | "komersil" | "fasilitas";
}

export default function GaleriPage() {
  const [activeCategory, setActiveCategory] = useState<string>("semua");
  const [activeImgIndex, setActiveImgIndex] = useState<number | null>(null);

  const categories = [
    { id: "semua", label: "Semua Foto" },
    { id: "subsidi", label: "Rumah Subsidi" },
    { id: "komersil", label: "Rumah Komersil" },
    { id: "fasilitas", label: "Fasilitas Umum" },
    { id: "kegiatan", label: "Kegiatan Kawasan" },
  ];

  const galleryItems: GalleryItem[] = [
    {
      src: "/images/gerbang.png",
      title: "Gerbang Utama & Pos Keamanan",
      desc: "Sistem gerbang satu pintu (One Gate System) dengan pos keamanan 24 jam untuk keamanan maksimal penghuni.",
      category: "fasilitas",
    },
    {
      src: "/images/rumah_subsidi_1.png",
      title: "Fasad Rumah Subsidi Tipe 36/60",
      desc: "Desain minimalis modern dengan struktur dinding kokoh, carport, dan taman depan yang hijau.",
      category: "subsidi",
    },
    {
      src: "/images/rumah_subsidi_2.jpg",
      title: "Lingkungan Cluster Subsidi",
      desc: "Row jalan beton yang lebar dan bersih dengan sistem drainase bawah tanah di sepanjang blok perumahan.",
      category: "subsidi",
    },
    {
      src: "/images/rumah_komersil.jpg",
      title: "Fasad Rumah Komersil Tipe 45/84",
      desc: "Hunian komersil modern eksklusif 2 lantai dengan desain arsitektur premium untuk keluarga dinamis.",
      category: "komersil",
    },
    {
      src: "/panorama/subsidi/kamar_utama.jpg",
      title: "Kamar Tidur Utama Komersil",
      desc: "Interior kamar tidur utama yang lapang dengan pencahayaan alami serta ventilasi udara yang sejuk.",
      category: "komersil",
    },
    {
      src: "/panorama/subsidi/kamar_anak.jpg",
      title: "Kamar Tidur Anak",
      desc: "Penataan ruang kamar tidur anak yang rapi, fungsional, dan nyaman untuk tempat belajar serta istirahat.",
      category: "komersil",
    },
    {
      src: "/panorama/subsidi/ruang_tamu.jpg",
      title: "Survei Lokasi Bersama Konsumen",
      desc: "Antusiasme calon pembeli saat berkunjung langsung ke lokasi proyek untuk melihat progres pembangunan unit.",
      category: "kegiatan",
    },
    {
      src: "/panorama/subsidi/dapur.jpg",
      title: "Interior Show Unit & Konsultasi",
      desc: "Tim marketing kami menjelaskan detail spesifikasi teknis dan opsi penataan interior dapur minimalis.",
      category: "kegiatan",
    },
  ];

  // Filter items berdasarkan kategori aktif
  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === "semua") return true;
    return item.category === activeCategory;
  });

  const openLightbox = (index: number) => {
    setActiveImgIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setActiveImgIndex(null);
  }, []);

  const navigateNext = useCallback(() => {
    if (activeImgIndex === null) return;
    setActiveImgIndex((prevIndex) => 
      prevIndex !== null && prevIndex < filteredItems.length - 1 ? prevIndex + 1 : 0
    );
  }, [activeImgIndex, filteredItems.length]);

  const navigatePrev = useCallback(() => {
    if (activeImgIndex === null) return;
    setActiveImgIndex((prevIndex) => 
      prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : filteredItems.length - 1
    );
  }, [activeImgIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImgIndex === null) return;
      
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        navigateNext();
      } else if (e.key === "ArrowLeft") {
        navigatePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImgIndex, closeLightbox, navigateNext, navigatePrev]);

  useEffect(() => {
    document.body.style.overflow = activeImgIndex !== null ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeImgIndex]);

  return (
    <div className="flex-1 flex flex-col items-center w-full bg-background min-h-screen">
      <Navbar />

      <main className="w-full pt-28 pb-24 flex flex-col items-center">
        {/* Header Galeri */}
        <div className="max-w-7xl w-full text-center px-4 mb-12">
          <span className="inline-block bg-[#92F7C3] text-[#00734D] rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-3">
            Koleksi Foto
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-4 leading-tight">
            Galeri Foto Perumahan
          </h1>
          <p className="text-foreground/80 max-w-2xl mx-auto font-body text-base">
            Jelajahi keindahan arsitektur, kenyamanan interior, fasilitas kawasan, serta berbagai momen kegiatan di Bumi Pasanggrahan.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="max-w-7xl w-full px-4 mb-12 overflow-x-auto flex justify-start md:justify-center gap-3 scrollbar-none pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveImgIndex(null); // Reset lightbox index saat filter ganti
              }}
              className={`shrink-0 px-6 py-3 rounded-2xl font-semibold text-sm transition-all focus:outline-none ${
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-md shadow-primary/10"
                  : "bg-surface-low text-foreground hover:bg-surface-highest border border-outline-variant/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Galeri Grid Layout */}
        <div className="max-w-7xl w-full px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[400px]">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className="relative h-[300px] md:h-[350px] rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 bg-white border border-outline-variant/10 animate-fade-in"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-103"
                />

                {/* Info Text Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                  <span className="text-[10px] text-[#92F7C3] uppercase font-bold tracking-widest mb-1.5">
                    {item.category === "fasilitas" && "Fasilitas Umum"}
                    {item.category === "subsidi" && "Rumah Subsidi"}
                    {item.category === "komersil" && "Rumah Komersil"}
                    {item.category === "kegiatan" && "Kegiatan Kawasan"}
                  </span>
                  <h3 className="text-white font-display font-bold text-lg md:text-xl mb-1 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    {item.title}
                  </h3>
                  <p className="text-white/80 font-body text-xs transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-75 line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                {/* Mobile Tap Indicator */}
                <div className="md:hidden absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-[10px] font-semibold flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  Lihat Detail
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <span className="text-4xl mb-4">📸</span>
              <p className="text-foreground/60 font-body">Belum ada foto dalam kategori ini.</p>
            </div>
          )}
        </div>

        {/* Banner Ajakan Whatsapp KPR */}
        <div className="max-w-4xl w-full px-4 mt-24">
          <div className="w-full text-center flex flex-col items-center gap-6 bg-surface-low rounded-[3rem] p-10 md:p-14 border border-outline-variant/10 shadow-sm">
            <span className="bg-[#92F7C3] text-[#00734D] rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-wider">
              Dapatkan Brosur & Price List Lengkap
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-primary max-w-xl leading-tight">
              Tertarik Dengan Hunian Kami? <br/>
              Ayo Hubungi Kami Sekarang!
            </h2>
            <p className="text-foreground/80 font-body text-sm md:text-base max-w-lg leading-relaxed">
              Diskusikan pilihan unit subsidi atau komersil idaman Anda bersama tim konsultan kami. Kami siap membimbing proses pengajuan KPR Anda hingga tuntas.
            </p>
            <WhatsAppButton
              label="Hubungi via WhatsApp"
              message="Halo Bumi Pasanggrahan, saya tertarik melihat galeri foto perumahan. Bisa dikirimkan brosur price list lengkap tipe subsidi dan komersil?"
              className="!px-8 !py-4"
            />
          </div>
        </div>
      </main>

      {/* Lightbox Pop-up Modal */}
      {activeImgIndex !== null && filteredItems[activeImgIndex] && (
        <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in">
          {/* Close Click Area */}
          <div className="absolute inset-0" onClick={closeLightbox}></div>

          {/* Top Panel */}
          <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-center bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
            <div className="text-white pr-4">
              <span className="text-[10px] text-[#92F7C3] uppercase font-bold tracking-widest block mb-1">
                {filteredItems[activeImgIndex].category === "fasilitas" && "Fasilitas Umum"}
                {filteredItems[activeImgIndex].category === "subsidi" && "Rumah Subsidi"}
                {filteredItems[activeImgIndex].category === "komersil" && "Rumah Komersil"}
                {filteredItems[activeImgIndex].category === "kegiatan" && "Kegiatan Kawasan"}
              </span>
              <h3 className="text-lg md:text-2xl font-display font-bold leading-snug">
                {filteredItems[activeImgIndex].title}
              </h3>
              <p className="text-xs md:text-sm text-gray-300 font-body mt-1 max-w-xl">
                {filteredItems[activeImgIndex].desc}
              </p>
            </div>
            <button
              onClick={closeLightbox}
              className="pointer-events-auto bg-white/10 hover:bg-white/20 border border-white/20 p-3 rounded-full text-white transition-all shadow-lg hover:scale-105"
              title="Tutup (Esc)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Center Image Container */}
          <div className="relative w-full max-w-5xl max-h-[70vh] aspect-[1.5/1] z-10 flex items-center justify-center rounded-2xl overflow-hidden select-none">
            <Image
              src={filteredItems[activeImgIndex].src}
              alt={filteredItems[activeImgIndex].title}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Left Navigation */}
          <button
            onClick={navigatePrev}
            className="absolute left-6 z-20 bg-white/10 hover:bg-white/20 border border-white/20 p-3 rounded-full text-white transition-all shadow-lg hidden md:block focus:outline-none hover:scale-105"
            title="Sebelumnya"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Navigation */}
          <button
            onClick={navigateNext}
            className="absolute right-6 z-20 bg-white/10 hover:bg-white/20 border border-white/20 p-3 rounded-full text-white transition-all shadow-lg hidden md:block focus:outline-none hover:scale-105"
            title="Selanjutnya"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Mobile Bottom Navigation Slider */}
          <div className="absolute bottom-6 z-20 flex gap-4 md:hidden bg-zinc-900/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-zinc-800 shadow-xl">
            <button onClick={navigatePrev} className="text-white hover:text-emerald-400 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-white/60 font-mono text-sm self-center">
              {activeImgIndex + 1} / {filteredItems.length}
            </span>
            <button onClick={navigateNext} className="text-white hover:text-emerald-400 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
