"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import type { SceneDef } from "@/components/VirtualTour";

const VirtualTour = dynamic(() => import("@/components/VirtualTour"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-900 text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-emerald-400" />
        <p className="text-sm font-medium text-white/80">Memuat tur virtual 3D...</p>
      </div>
    </div>
  ),
});

// Definisikan kategori 3D Virtual Tour
interface TourCategory {
  id: string;
  name: string;
  initialSceneId: string;
  icon: React.ReactNode;
  scenes: Record<string, SceneDef>;
}

export default function VirtualTourPage() {
  const [activeCategory, setActiveCategory] = useState<string>("subsidi");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Data virtual tour untuk setiap kategori beserta detail deskripsinya
  const categories: TourCategory[] = [
    {
      id: "subsidi",
      name: "Tipe Subsidi",
      initialSceneId: "exterior",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      scenes: {
        exterior: {
          id: "exterior",
          title: "Rumah Subsidi (Tampak Depan)",
          subtitle: "Jelajahi kawasan perumahan subsidi 360°",
          imagePath: "/panorama/komersil/depansubsidi.png",
          initialRotation: -1.42,
          hotspots: [
            {
              position: [-200, -8, -30],
              targetScene: "teras_subsidi",
              label: "Depan\nTeras",
            },
          ],
          info: {
            imagePath: "/images/rumah_subsidi_1.png",
            dimensions: "6m x 10m",
            area: "LT 60 m² / LB 36 m²",
            description:
              "Fasad luar unit subsidi perumahan Bumi Pasanggrahan dengan gaya arsitektur modern minimalis. Sudah dilengkapi dengan area carport beton, taman depan asri, sirkulasi udara yang luas, dan struktur kokoh dinding dobel bata merah.",
          },
        },
        teras_subsidi: {
          id: "teras_subsidi",
          title: "Teras Subsidi",
          subtitle: "Area outdoor yang nyaman",
          imagePath: "/panorama/komersil/terssubsidi.png",
          initialRotation: 0,
          hotspots: [
            {
              position: [0, -20, 100],
              targetScene: "exterior",
              label: "Keluar",
            },
            {
              position: [-980, -50, 80],
              targetScene: "ruang_tamu",
              label: "Ruang\nTamu",
            },
          ],
          info: {
            imagePath: "/images/rumah_subsidi_2.jpg",
            dimensions: "3m x 3.5m",
            area: "10.5 m²",
            description:
              "Area ruang tamu & ruang keluarga yang fungsional dengan pencahayaan alami yang melimpah dari jendela depan. Layout yang dinamis memudahkan penataan sofa dan meja keluarga minimalis sesuai kebutuhan.",
          },
        },
        ruang_tamu: {
          id: "ruang_tamu",
          title: "Ruang Tamu (Tipe Subsidi)",
          subtitle: "Desain interior modern & fungsional",
          imagePath: "/panorama/komersil/tengahsubsidi.png",
          initialRotation: 0,
          hotspots: [
            {
              position: [0, -20, 100],
              targetScene: "exterior",
              label: "Keluar",
            },
            {
              position: [-980, -50, 80],
              targetScene: "kamar_utama",
              label: "Kamar\nUtama",
            },
            {
              position: [-100, -10, -80],
              targetScene: "kamar_anak",
              label: "Kamar\nAnak",
            },
            {
              position: [40, -15, -100],
              targetScene: "dapur",
              label: "Dapur",
            },
            {
              position: [90, -15, 60],
              targetScene: "wc",
              label: "Kamar\nMandi",
            },
          ],
          info: {
            imagePath: "/images/rumah_subsidi_2.jpg",
            dimensions: "3m x 3.5m",
            area: "10.5 m²",
            description:
              "Area ruang tamu & ruang keluarga yang fungsional dengan pencahayaan alami yang melimpah dari jendela depan. Layout yang dinamis memudahkan penataan sofa dan meja keluarga minimalis sesuai kebutuhan.",
          },
        },
        kamar_utama: {
          id: "kamar_utama",
          title: "Kamar Utama (Tipe Subsidi)",
          subtitle: "Kamar tidur utama bersih & nyaman",
          imagePath: "/panorama/subsidi/kamar_utama.jpg",
          initialRotation: 0,
          hotspots: [
            {
              position: [0, -20, 100],
              targetScene: "ruang_tamu",
              label: "Kembali",
            },
          ],
          info: {
            imagePath: "/panorama/subsidi/kamar_utama.jpg",
            dimensions: "3m x 3m",
            area: "9 m²",
            description:
              "Kamar tidur utama yang dirancang lapang untuk penempatan kasur ukuran Queen (No. 2). Dilengkapi ventilasi udara horizontal untuk sirkulasi kamar yang sejuk dan menenangkan.",
          },
        },
        kamar_anak: {
          id: "kamar_anak",
          title: "Kamar Anak (Tipe Subsidi)",
          subtitle: "Kamar tidur anak yang ceria",
          imagePath: "/panorama/subsidi/kamar_anak.jpg",
          initialRotation: 0,
          hotspots: [
            {
              position: [0, -20, 100],
              targetScene: "ruang_tamu",
              label: "Kembali",
            },
          ],
          info: {
            imagePath: "/panorama/subsidi/kamar_anak.jpg",
            dimensions: "2.5m x 3m",
            area: "7.5 m²",
            description:
              "Kamar tidur sekunder yang sangat cocok untuk kamar anak atau ruang kerja pribadi. Tata letak ruang yang presisi mempermudah integrasi meja belajar, lemari, dan kasur single.",
          },
        },
        dapur: {
          id: "dapur",
          title: "Dapur (Tipe Subsidi)",
          subtitle: "Dapur bersih siap pakai",
          imagePath: "/panorama/subsidi/dapur.jpg",
          initialRotation: 0,
          hotspots: [
            {
              position: [0, -20, 100],
              targetScene: "ruang_tamu",
              label: "Kembali",
            },
          ],
          info: {
            imagePath: "/panorama/subsidi/dapur.jpg",
            dimensions: "2m x 3m",
            area: "6 m²",
            description:
              "Area dapur belakang semi-outdoor yang dirancang fungsional lengkap dengan wastafel cuci piring dan meja beton cor. Menjamin asap dapur mengalir langsung ke luar ruangan untuk sirkulasi rumah yang sehat.",
          },
        },
        wc: {
          id: "wc",
          title: "Kamar Mandi (Tipe Subsidi)",
          subtitle: "Fasilitas sanitasi bersih & higienis",
          imagePath: "/panorama/subsidi/wc_subsidi.jpg",
          initialRotation: 0,
          hotspots: [
            {
              position: [0, -20, 100],
              targetScene: "ruang_tamu",
              label: "Kembali",
            },
          ],
          info: {
            imagePath: "/panorama/subsidi/wc_subsidi.jpg",
            dimensions: "1.5m x 1.5m",
            area: "2.25 m²",
            description:
              "Kamar mandi modern bernuansa bersih dengan kloset jongkok/duduk, dilapisi lantai keramik antislip bermutu tinggi demi kenyamanan sirkulasi sanitasi keluarga.",
          },
        },
      },
    },
    {
      id: "komersil",
      name: "Tipe Komersil",
      initialSceneId: "exterior",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <path d="M3 22V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14" />
          <path d="M18 22V12a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v10" />
          <path d="M12 6V2" />
        </svg>
      ),
      scenes: {
        exterior: {
          id: "exterior",
          title: "Rumah Komersil (Tampak Depan)",
          subtitle: "Fasad luar tipe komersil eksklusif",
          imagePath: "/panorama/komersil/tampak_depan_komersil.png",
          initialRotation: -1.2,
          hotspots: [
            {
              position: [-200, -8, -30],
              targetScene: "teras",
              label: "Ke Teras",
            },
          ],
          info: {
            imagePath: "/images/rumah_komersil.jpg",
            dimensions: "7m x 12m",
            area: "LT 84 m² / LB 45 m²",
            description:
              "Tampilan luar unit premium tipe komersil Bumi Pasanggrahan dengan fasad modern kontemporer yang elegan. Dilengkapi dengan carport berukuran besar (muat hingga 2 mobil), taman depan minimalis, dan finishing cat dinding premium tahan cuaca.",
          },
        },
        teras: {
          id: "teras",
          title: "Teras Depan (Tipe Komersil)",
          subtitle: "Teras depan luas & asri",
          imagePath: "/panorama/komersil/teras_komersil.png",
          initialRotation: 0,
          hotspots: [
            {
              position: [0, -20, 100],
              targetScene: "exterior",
              label: "Tampak\nDepan",
            },
            {
              position: [-200, -10, -30],
              targetScene: "ruang_tamu",
              label: "Masuk\nRumah",
            },
          ],
          info: {
            imagePath: "/panorama/komersil/teras_komersil.png",
            dimensions: "2.5m x 3m",
            area: "7.5 m²",
            description:
              "Teras depan yang representatif dengan lantai ubin granit berkelas, memberikan kesan penyambutan mewah sebelum melangkah masuk ke dalam hunian utama.",
          },
        },
        ruang_tamu: {
          id: "ruang_tamu",
          title: "Ruang Tamu (Tipe Komersil)",
          subtitle: "Interior ruang keluarga premium & mewah",
          imagePath: "/panorama/komersil/tamu_komersil.png",
          initialRotation: 0,
          hotspots: [
            {
              position: [0, -20, 100],
              targetScene: "teras",
              label: "Ke Teras",
            },
            {
              position: [-100, -10, -80],
              targetScene: "ruang_tengah",
              label: "Ruang\nTengah",
            },
          ],
          info: {
            imagePath: "/panorama/komersil/tamu_komersil.png",
            dimensions: "4m x 4m",
            area: "16 m²",
            description:
              "Ruang tamu eksklusif berplafon tinggi (high ceiling) yang dirancang untuk menciptakan sirkulasi udara optimal dan pencahayaan yang merata, melambangkan kemewahan tinggal di cluster komersil.",
          },
        },
        ruang_tengah: {
          id: "ruang_tengah",
          title: "Ruang Tengah (Tipe Komersil)",
          subtitle: "Ruang tengah keluarga multi-fungsi",
          imagePath: "/panorama/komersil/Ruang_tengah_komersil.png",
          initialRotation: 0,
          hotspots: [
            {
              position: [0, -20, 100],
              targetScene: "ruang_tamu",
              label: "Ruang\nTamu",
            },
            {
              position: [40, -15, -100],
              targetScene: "dapur",
              label: "Dapur",
            },
          ],
          info: {
            imagePath: "/panorama/komersil/Ruang_tengah_komersil.png",
            dimensions: "4m x 5m",
            area: "20 m²",
            description:
              "Ruang keluarga tengah berdimensi lapang sebagai sentral aktivitas berkumpul, bersantai, dan berinteraksi. Sangat cocok ditempatkan home theater set atau meja makan keluarga besar.",
          },
        },
        dapur: {
          id: "dapur",
          title: "Dapur (Tipe Komersil)",
          subtitle: "Dapur modern, bersih, & estetik",
          imagePath: "/panorama/komersil/dapur_komersil.png",
          initialRotation: 0,
          hotspots: [
            {
              position: [0, -20, 100],
              targetScene: "ruang_tengah",
              label: "Kembali",
            },
          ],
          info: {
            imagePath: "/panorama/komersil/dapur_komersil.png",
            dimensions: "3m x 3m",
            area: "9 m²",
            description:
              "Dapur dalam berdesain modern minimalis, ditunjang dengan meja counter beton lapis granit hitam. Memiliki instalasi pipa air bersih yang andal dan space khusus kulkas besar.",
          },
        },
      },
    },
    {
      id: "masjid",
      name: "Masjid",
      initialSceneId: "exterior",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <path d="M12 2v3" />
          <path d="M12 5c-3 0-5 2-5 5v12h10V10c0-3-2-5-5-5z" />
          <path d="M4 22h16" />
          <path d="M7 15h10" />
          <path d="M10 22v-4h4v4" />
        </svg>
      ),
      scenes: {
        exterior: {
          id: "exterior",
          title: "Halaman Masjid Al-Muhajirin",
          subtitle: "Masjid megah di dalam kawasan perumahan",
          imagePath: "/panorama/subsidi/scene_74.jpg",
          initialRotation: 0,
          hotspots: [
            {
              position: [-200, -8, -30],
              targetScene: "interior",
              label: "Masuk\nMasjid",
            },
          ],
          info: {
            imagePath: "/panorama/subsidi/scene_74.jpg",
            dimensions: "15m x 15m",
            area: "225 m²",
            description:
              "Halaman depan Masjid Jami Al-Muhajirin yang bersih dan asri, dilengkapi dengan area parkir kendaraan, taman kecil, dan tempat wudhu luar ruangan yang higienis.",
          },
        },
        interior: {
          id: "interior",
          title: "Ruang Utama Masjid",
          subtitle: "Interior masjid yang luas, sejuk & tertib",
          imagePath: "/panorama/subsidi/scene_75.jpg",
          initialRotation: 0,
          hotspots: [
            {
              position: [0, -20, 100],
              targetScene: "exterior",
              label: "Keluar",
            },
          ],
          info: {
            imagePath: "/panorama/subsidi/scene_75.jpg",
            dimensions: "12m x 12m",
            area: "144 m²",
            description:
              "Ruang dalam ibadah utama shalat berjamaah. Desain interior bernuansa islami modern dengan karpet sajadah tebal dan wangi, serta pencahayaan lampu gantung yang tenang dan teduh.",
          },
        },
      },
    },
    {
      id: "fasilitas",
      name: "Fasilitas Umum",
      initialSceneId: "playground",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <path d="M12 20v-8" />
          <path d="M20 10c0-4.4-3.6-8-8-8S4 5.6 4 10c0 3 1.7 5.7 4.3 7L12 20l3.7-3c2.6-1.3 4.3-4 4.3-7z" />
        </svg>
      ),
      scenes: {
        playground: {
          id: "playground",
          title: "Taman Bermain & Gazebo",
          subtitle: "Ruang terbuka hijau ramah anak untuk warga",
          imagePath: "/panorama/subsidi/scene_44.jpg",
          initialRotation: 0,
          hotspots: [
            {
              position: [-200, -8, -30],
              targetScene: "jalan",
              label: "Ke Jalan",
            },
          ],
          info: {
            imagePath: "/panorama/subsidi/scene_44.jpg",
            dimensions: "20m x 30m",
            area: "600 m²",
            description:
              "Ruang Terbuka Hijau (RTH) yang berlokasi strategis di tengah cluster. Dilengkapi dengan wahana ayunan, perosotan anak, jalur pijat refleksi kaki, serta gazebo kayu untuk tempat berteduh warga cluster.",
          },
        },
        jalan: {
          id: "jalan",
          title: "Row Jalan Utama",
          subtitle: "Jalan beton lebar 8 meter bersih & tertata rapi",
          imagePath: "/panorama/subsidi/scene_70.jpg",
          initialRotation: 0,
          hotspots: [
            {
              position: [0, -20, 100],
              targetScene: "playground",
              label: "Ke Taman",
            },
            {
              position: [-200, -10, -30],
              targetScene: "gerbang",
              label: "Ke Gerbang",
            },
          ],
          info: {
            imagePath: "/panorama/subsidi/scene_70.jpg",
            dimensions: "Lebar 8m",
            area: "Akses Utama Beton",
            description:
              "Jalur row jalan utama perumahan yang lebar dan dicor beton kualitas tinggi, bebas banjir dan muat berpapasan 2 mobil dengan leluasa. Dilengkapi dengan jalur drainase tertutup di samping kiri-kanan jalan.",
          },
        },
        gerbang: {
          id: "gerbang",
          title: "Gerbang Utama Perumahan",
          subtitle: "Sistem satu pintu dengan pos pengamanan 24 jam",
          imagePath: "/panorama/subsidi/scene_72.jpg",
          initialRotation: 0,
          hotspots: [
            {
              position: [0, -20, 100],
              targetScene: "jalan",
              label: "Ke Jalan",
            },
          ],
          info: {
            imagePath: "/images/gerbang.png",
            dimensions: "12m x 15m",
            area: "One Gate System",
            description:
              "Gerbang masuk utama perumahan Bumi Pasanggrahan dengan One Gate System (Sistem Satu Pintu). Dilengkapi pos penjagaan satpam 24 jam penuh untuk menjamin keamanan optimal seluruh penghuni perumahan.",
          },
        },
      },
    },
  ];

  // Ambil data untuk kategori aktif
  const currentCategory =
    categories.find((cat) => cat.id === activeCategory) || categories[0];

  // Tutup dropdown ketika klik di luar komponen
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/*
        Gunakan key={activeCategory} agar VirtualTour di-remount sepenuhnya
        saat kategori berubah, sehingga Three.js canvas dan guide modal ter-reset
      */}
      <VirtualTour
        key={activeCategory}
        scenes={currentCategory.scenes}
        initialSceneId={currentCategory.initialSceneId}
      />

      {/* Floating Category Filter Selector (Pojok kiri bawah) */}
      <div
        ref={dropdownRef}
        className="fixed bottom-[calc(5.2rem+env(safe-area-inset-bottom))] md:bottom-8 left-6 md:left-8 z-[100] font-sans"
      >
        <div className="relative">
          {/* Dropup Options Menu */}
          <div
            className={`absolute bottom-16 left-0 mb-1 w-52 bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2.5 shadow-2xl flex flex-col gap-1.5 transition-all duration-300 origin-bottom-left ${
              isOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-90 translate-y-4 pointer-events-none"
            }`}
          >
            <div className="px-2.5 py-1 text-[10px] font-bold text-white/40 uppercase tracking-widest border-b border-white/5 mb-1">
              Pilih Area 3D
            </div>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-left focus:outline-none cursor-pointer ${
                    isActive
                      ? "bg-emerald-600/90 text-white shadow-[0_4px_12px_rgba(5,150,105,0.3)]"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span
                    className={isActive ? "text-white" : "text-emerald-400"}
                  >
                    {cat.icon}
                  </span>
                  <span>{cat.name}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Floating Trigger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center gap-2 bg-zinc-900/80 backdrop-blur-md text-white border border-white/20 px-5 py-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto hover:bg-zinc-800/90 hover:border-emerald-500/40 group focus:outline-none cursor-pointer"
            aria-label="Pilih kategori Virtual Tour"
          >
            <span className="text-emerald-400 group-hover:rotate-12 transition-transform duration-300">
              {currentCategory.icon}
            </span>
            <span className="text-xs font-bold tracking-wide uppercase pr-1">
              {currentCategory.name}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : "rotate-0"}`}
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
