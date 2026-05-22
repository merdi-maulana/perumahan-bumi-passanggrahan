"use client";

import { Suspense, useState, useEffect, Component, type ReactNode } from 'react';
import Image from 'next/image';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { configurePanoramaTexture, PanoramaTextureLoader } from '@/lib/panorama-texture';

export interface HotspotDef {
  position: [number, number, number];
  targetScene: string;
  label: string;
}

export interface SceneInfo {
  imagePath: string;
  dimensions: string;
  area: string;
  description: string;
}

export interface SceneDef {
  id: string;
  title: string;
  subtitle: string;
  imagePath: string;
  initialRotation?: number; // Rotasi awal untuk memusatkan kamera (dalam radian)
  hotspots: HotspotDef[];
  info?: SceneInfo;
}

interface VirtualTourProps {
  scenes: Record<string, SceneDef>;
  initialSceneId: string;
}

// Error Boundary untuk menangkap error saat load texture gagal
class TextureErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Komponen untuk me-render gambar 360 derajat di dalam bola (sphere)
function Dome({ imagePath }: { imagePath: string }) {
  const texture = useLoader(PanoramaTextureLoader, imagePath);
  const { gl } = useThree();

  /* eslint-disable react-hooks/immutability */
  useEffect(() => {
    configurePanoramaTexture(texture, gl);
  }, [texture, gl]);
  /* eslint-enable react-hooks/immutability */
  
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

export default function VirtualTour({ scenes, initialSceneId }: VirtualTourProps) {
  const [currentSceneId, setCurrentSceneId] = useState(initialSceneId);
  const [showGuide, setShowGuide] = useState(true);
  const [fadeGuide, setFadeGuide] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [dpr, setDpr] = useState(1);
  const scene = scenes[currentSceneId];

  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio || 1, 2));
  }, []);

  const dismissGuide = () => {
    if (showGuide && !fadeGuide) {
      setFadeGuide(true);
      setTimeout(() => {
        setShowGuide(false);
      }, 500);
    }
  };

  // Helper untuk mendapatkan koordinat saat klik (berguna untuk development / mencari posisi hotspot)
  const handlePointerDown = () => {
    // uncomment baris di bawah jika ingin mencari koordinat hotspot baru
    // console.log("Clicked coordinates:", e.point);
  };

  if (!scene) {
    return <div className="flex h-screen items-center justify-center bg-zinc-900 text-white">Scene tidak ditemukan</div>;
  }

  return (
    <div 
      onPointerDown={dismissGuide} 
      onTouchStart={dismissGuide} 
      className="relative w-full h-screen overflow-hidden bg-zinc-900 font-sans"
    >
      <style>{`
        @keyframes rotatePhone {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-90deg); }
        }
        @keyframes swipeHorizontal {
          0%, 100% { transform: translateX(-10px); }
          50% { transform: translateX(10px); }
        }
        .animate-rotate-phone {
          animation: rotatePhone 2.5s ease-in-out infinite;
          transform-origin: center;
        }
        .animate-swipe-horizontal {
          animation: swipeHorizontal 1.8s ease-in-out infinite;
        }
        .info-modal {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        @media (min-width: 768px) or (orientation: landscape) {
          .info-modal {
            left: auto;
            right: 0;
            width: 30vw;
            min-width: 380px;
            max-width: 460px;
            height: 100%;
            border-left: 1px solid rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>

      {/* Fullscreen Guide Overlay Modal (fades out when user starts swiping/touching) */}
      {showGuide && (
        <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-500 pointer-events-none ${fadeGuide ? 'opacity-0' : 'opacity-100'}`}>
          <div className="max-w-md w-full px-6 flex flex-col items-center text-center text-white">
            
            {/* Guide Icons */}
            <div className="flex justify-center gap-12 md:gap-16 mb-8 items-center">
              {/* Landscape Orientation */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  <svg className="w-8 h-8 animate-rotate-phone text-[#92F7C3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </div>
                <span className="text-xs font-semibold max-w-[120px] leading-relaxed">Putar HP Horizontal</span>
              </div>

              {/* Swipe Guide */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  <svg className="w-8 h-8 text-[#92F7C3] flex items-center justify-center" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Hand / Swipe symbol */}
                    <path d="M12 5v14" className="animate-swipe-horizontal" />
                    <path d="m19 12-7-7-7 7" className="animate-swipe-horizontal" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }} />
                  </svg>
                </div>
                <span className="text-xs font-semibold max-w-[120px] leading-relaxed">Geser Layar 360°</span>
              </div>
            </div>

            {/* Guide Headline & Description */}
            <h2 className="text-xl md:text-2xl font-display font-bold mb-2">Petunjuk Tur Virtual 3D</h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Gunakan mode landscape/horizontal pada handphone Anda dan geser layar untuk menjelajahi seluruh sudut ruangan.
            </p>
          </div>
        </div>
      )}

      {/* UI Overlay: Judul & Subjudul */}
      <div className="absolute top-0 left-0 w-full p-8 z-10 pointer-events-none flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight drop-shadow-lg">
            {scene.title}
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md mt-2 font-light">
            {scene.subtitle}
          </p>
        </div>
        <div className="pointer-events-auto">
           {currentSceneId !== initialSceneId && (
             <button 
               onClick={() => setCurrentSceneId(initialSceneId)}
               className="bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md px-6 py-3 rounded-full text-white font-medium transition-all duration-300 shadow-lg"
             >
               Kembali ke Luar
             </button>
           )}
        </div>
      </div>
      
      {/* Instruksi Overlay (Bottom Guide) */}
      {showGuide && (
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none transition-opacity duration-500 ${fadeGuide ? 'opacity-0' : 'opacity-100'}`}>
          <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-xl">
            <p className="text-white/90 text-sm font-medium flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5H5z"/><path d="M5 9v10"/><path d="m9 16-4 3-4-3"/></svg>
              Geser layar untuk melihat sekeliling
            </p>
          </div>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 0, 0.1], fov: 60 }}
        dpr={dpr}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
        style={{ width: '100%', height: '100%', touchAction: 'none' }}
      >
        <Suspense fallback={
          <Html center>
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              <div className="text-white font-medium drop-shadow-md">Memuat 360°...</div>
            </div>
          </Html>
        }>
          {/* Group ini berfungsi untuk merotasi gambar secara otomatis ke titik awal */}
          <group rotation={[0, scene.initialRotation || 0, 0]} onClick={handlePointerDown}>
            <TextureErrorBoundary fallback={
              <Html center>
                <div className="flex flex-col items-center gap-3 text-center max-w-xs">
                  <div className="text-red-400 text-4xl">⚠️</div>
                  <div className="text-white font-medium">Gagal memuat panorama</div>
                  <div className="text-white/60 text-sm">Gambar tidak ditemukan atau gagal dimuat dari server.</div>
                </div>
              </Html>
            }>
              <Dome imagePath={scene.imagePath} />
            </TextureErrorBoundary>
            
            {/* Render semua hotspot secara dinamis */}
            {scene.hotspots.map((hotspot, idx) => (
              <Html key={idx} position={hotspot.position} center>
                <div 
                  onClick={() => {
                    setCurrentSceneId(hotspot.targetScene);
                    // Tutup modal jika ruangan baru tidak memiliki info deskripsi
                    if (!scenes[hotspot.targetScene]?.info) {
                      setShowInfoModal(false);
                    }
                  }}
                  className="group relative cursor-pointer"
                >
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                  <div className="w-16 h-16 bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-full border-2 border-white/80 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.4)] text-center p-1">
                    <span className="text-white text-[10px] sm:text-xs font-bold drop-shadow-lg leading-tight uppercase tracking-wider whitespace-pre-line">
                      {hotspot.label}
                    </span>
                  </div>
                </div>
              </Html>
            ))}
          </group>
          
        </Suspense>
        
        {/* Enable rotasi drag oleh pengguna */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          rotateSpeed={-0.6} // Dibalik agar pergeserannya natural di 360 panorama
          dampingFactor={0.05}
          onStart={dismissGuide}
        />
      </Canvas>

      {/* Floating Info Button (Stacking di atas tombol WhatsApp di pojok kanan bawah) */}
      {scene.info && (
        <button
          onClick={() => setShowInfoModal(true)}
          className="fixed bottom-[calc(10.2rem+env(safe-area-inset-bottom))] md:bottom-28 right-6 md:right-8 z-[100] w-14 h-14 bg-zinc-900/80 backdrop-blur-md text-white border border-white/20 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto hover:bg-zinc-800/90 hover:border-emerald-500/40 focus:outline-none flex items-center justify-center group"
          aria-label="Tampilkan detail ruangan"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-emerald-400 group-hover:rotate-12 transition-transform duration-300"
          >
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
        </button>
      )}

      {/* Info Modal Panel */}
      {showInfoModal && scene.info && (
        <>
          <div className="info-modal bg-black/75 z-[120] text-white flex flex-col font-sans border-white/10 overflow-y-auto">
            {/* Close Button */}
            <button 
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 z-50 bg-black/60 hover:bg-black/80 border border-white/20 p-2.5 rounded-full text-white transition-all hover:scale-105 focus:outline-none cursor-pointer"
              aria-label="Tutup deskripsi"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Layout Image */}
            {scene.info.imagePath && (
              <div className="relative w-full h-48 md:h-56 shrink-0 bg-zinc-950">
                <Image
                  src={scene.info.imagePath}
                  alt={scene.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60" />
              </div>
            )}

            {/* Description Info Content */}
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <span className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase mb-1">
                Informasi Unit / Ruangan
              </span>
              <h2 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight mb-4 leading-tight">
                {scene.title}
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <span className="text-[10px] text-white/55 uppercase tracking-widest block mb-1 font-semibold">Luas</span>
                  <span className="text-sm md:text-base font-bold text-emerald-400">{scene.info.area}</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <span className="text-[10px] text-white/55 uppercase tracking-widest block mb-1 font-semibold">Dimensi</span>
                  <span className="text-sm md:text-base font-bold text-emerald-400">{scene.info.dimensions}</span>
                </div>
              </div>

              <div className="flex-1">
                <span className="text-[10px] text-white/55 uppercase tracking-widest block mb-2 font-semibold">Deskripsi</span>
                <p className="text-sm text-white/80 leading-relaxed font-light font-body">
                  {scene.info.description}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
