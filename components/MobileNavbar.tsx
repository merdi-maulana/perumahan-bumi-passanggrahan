"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNavbar() {
  const pathname = usePathname();

  // Hide the global navbar if we're inside the 360 viewer? 
  // The user explicitly requested "buat navbar untuk yang dibawah...". 
  // It should probably be visible everywhere on mobile.
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-zinc-200 shadow-[0_-5px_20px_-15px_rgba(0,0,0,0.3)]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex justify-around items-center h-16">
        {/* Tombol Home */}
        <Link 
          href="/" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${pathname === '/' ? 'text-emerald-600' : 'text-zinc-500 hover:text-emerald-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span className="text-[10px] font-bold">Home</span>
        </Link>

        {/* Tombol WhatsApp */}
        {/* Ganti nomor WA di dalam href di bawah ini dengan nomor yang sebenarnya */}
        <a 
          href="https://wa.me/6282218778178?text=Halo%2C%20saya%20tertarik%20dengan%20Perumahan%20Bumi%20Pasanggrahan" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center w-full h-full space-y-1 text-zinc-500 hover:text-emerald-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span className="text-[10px] font-bold">WhatsApp</span>
        </a>

        {/* Tombol 3D Virtual Tour */}
        <Link 
          href="/3d/360web" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${pathname === '/3d/360web' ? 'text-emerald-600' : 'text-zinc-500 hover:text-emerald-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
          <span className="text-[10px] font-bold">Virtual 3D</span>
        </Link>
      </div>
    </div>
  );
}
