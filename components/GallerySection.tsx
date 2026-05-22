"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface GalleryItem {
  src: string;
  title: string;
  desc: string;
}

export default function GallerySection() {
  const [activeImgIndex, setActiveImgIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      src: "/images/gerbang.png",
      title: "Gerbang Utama",
      desc: "Akses masuk utama bernuansa asri dengan sistem keamanan satu pintu.",
    },
    {
      src: "/images/rumah_subsidi_1.png",
      title: "Tampak Depan Rumah Subsidi",
      desc: "Desain minimalis modern Tipe 36 dengan halaman hijau di depannya.",
    },
    {
      src: "/images/rumah_komersil.jpg",
      title: "Tampak Depan Rumah Komersil",
      desc: "Hunian komersil modern 2 lantai bernuansa mewah dan eksklusif.",
    },
    {
      src: "/images/rumah_subsidi_2.jpg",
      title: "Kawasan Lingkungan Perumahan",
      desc: "Row jalan yang lebar dengan penataan lingkungan yang asri dan bersih.",
    },
    {
      src: "/panorama/ruang_tamu.png",
      title: "Interior Ruang Tamu",
      desc: "Desain interior lapang dengan pencahayaan alami yang optimal.",
    },
    {
      src: "/panorama/kamar_utama.png",
      title: "Kamar Tidur Utama",
      desc: "Kamar tidur luas yang nyaman untuk relaksasi maksimal.",
    },
    {
      src: "/panorama/dapur.png",
      title: "Dapur & Ruang Makan",
      desc: "Dapur bersih bernuansa minimalis modern yang fungsional.",
    },
    {
      src: "/panorama/kamar_anak.png",
      title: "Kamar Tidur Anak",
      desc: "Kamar anak bernuansa ceria dengan sirkulasi udara yang baik.",
    },
  ];

  const openLightbox = (index: number) => {
    setActiveImgIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setActiveImgIndex(null);
  }, []);

  const navigateNext = useCallback(() => {
    if (activeImgIndex === null) return;
    setActiveImgIndex((prevIndex) => 
      prevIndex !== null && prevIndex < galleryItems.length - 1 ? prevIndex + 1 : 0
    );
  }, [activeImgIndex, galleryItems.length]);

  const navigatePrev = useCallback(() => {
    if (activeImgIndex === null) return;
    setActiveImgIndex((prevIndex) => 
      prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : galleryItems.length - 1
    );
  }, [activeImgIndex, galleryItems.length]);

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
    <section id="galeri" className="w-full py-24 px-4 bg-surface-low flex flex-col items-center justify-center">
      {/* Section Header */}
      <div className="max-w-7xl w-full text-center mb-16">
        <span className="inline-block bg-[#92F7C3] text-[#00734D] rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-3">
          Galeri Foto
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-4">
          Keindahan Lingkungan Kami
        </h2>
        <p className="text-foreground/80 max-w-2xl mx-auto font-body text-base">
          Lihat setiap sudut kawasan perumahan Bumi Pasanggrahan. Dari gerbang masuk yang megah hingga interior ruangan yang tertata apik.
        </p>
      </div>

      {/* Grid Galeri: Masonry/Asymmetric Layout di Desktop (hidden on mobile) */}
      <div className="max-w-7xl w-full hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {galleryItems.map((item, index) => {
          // Buat varian tinggi gambar untuk efek asimetris premium
          let gridClasses = "col-span-1 h-[300px] md:h-[350px]";
          if (index === 0) {
            gridClasses = "col-span-1 lg:col-span-2 h-[300px] md:h-[350px]";
          } else if (index === 4) {
            gridClasses = "col-span-1 lg:col-span-2 h-[300px] md:h-[350px]";
          }

          return (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className={`${gridClasses} relative rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 bg-white border border-outline-variant/10`}
            >
              {/* Gambar Galeri */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-all duration-700 ease-out group-hover:scale-103"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                <h3 className="text-white font-display font-bold text-xl mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.title}
                </h3>
                <p className="text-white/80 font-body text-xs transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.desc}
                </p>
              </div>

              {/* Tap Indicator (Mobile Only) */}
              <div className="md:hidden absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[10px] font-semibold flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                Lihat Detail
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Slideshow/Horizontal Scroll (hidden on desktop) */}
      <div className="w-full md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-6 scrollbar-none">
        {galleryItems.slice(0, 4).map((item, index) => (
          <div
            key={index}
            onClick={() => openLightbox(index)}
            className="snap-center shrink-0 w-[280px] h-[300px] relative rounded-[2rem] overflow-hidden shadow-md bg-white border border-outline-variant/10 cursor-pointer"
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="280px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
              <h3 className="text-white font-display font-bold text-base mb-1">
                {item.title}
              </h3>
              <p className="text-white/80 font-body text-[10px] line-clamp-2">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
        
        {/* Card ke-5: Link ke Halaman Galeri */}
        <Link
          href="/galeri"
          className="snap-center shrink-0 w-[280px] h-[300px] bg-gradient-to-br from-primary/10 to-primary/20 backdrop-blur-sm rounded-[2rem] border border-primary/20 flex flex-col items-center justify-center text-center p-6 transition-all duration-300 hover:scale-102 hover:shadow-lg group shadow-sm cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
          <h3 className="font-display font-bold text-primary text-lg mb-1">Lihat Semua Foto</h3>
          <p className="text-foreground/75 font-body text-xs leading-relaxed">
            Temukan galeri lengkap, fasilitas umum, unit komersil & subsidi, serta kegiatan kawasan.
          </p>
        </Link>
      </div>

      {/* Lightbox Pop-up Modal */}
      {activeImgIndex !== null && (
        <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in">
          {/* Close Area */}
          <div className="absolute inset-0" onClick={closeLightbox}></div>

          {/* Top Panel (Title & Close Button) */}
          <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-center bg-gradient-to-b from-black/75 to-transparent pointer-events-none">
            <div className="text-white">
              <h3 className="text-lg md:text-2xl font-display font-bold">
                {galleryItems[activeImgIndex].title}
              </h3>
              <p className="text-xs md:text-sm text-gray-300 font-body mt-1">
                {galleryItems[activeImgIndex].desc}
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
          <div className="relative w-full max-w-5xl max-h-[75vh] aspect-[1.5/1] z-10 flex items-center justify-center rounded-2xl overflow-hidden select-none">
            <Image
              src={galleryItems[activeImgIndex].src}
              alt={galleryItems[activeImgIndex].title}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Left Arrow Navigation */}
          <button
            onClick={navigatePrev}
            className="absolute left-6 z-20 bg-white/10 hover:bg-white/20 border border-white/20 p-3 rounded-full text-white transition-all shadow-lg hidden md:block focus:outline-none hover:scale-105"
            title="Sebelumnya"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow Navigation */}
          <button
            onClick={navigateNext}
            className="absolute right-6 z-20 bg-white/10 hover:bg-white/20 border border-white/20 p-3 rounded-full text-white transition-all shadow-lg hidden md:block focus:outline-none hover:scale-105"
            title="Selanjutnya"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Mobile Bottom Navigation Helper */}
          <div className="absolute bottom-6 z-20 flex gap-4 md:hidden bg-zinc-900/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-zinc-800 shadow-xl">
            <button onClick={navigatePrev} className="text-white hover:text-emerald-400 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-white/60 font-mono text-sm self-center">
              {activeImgIndex + 1} / {galleryItems.length}
            </span>
            <button onClick={navigateNext} className="text-white hover:text-emerald-400 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
